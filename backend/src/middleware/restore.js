const errors = require("@feathersjs/errors");
const path = require("path");
const fs = require("fs");

const unzip = require("../lib/restore/unzip");
const getService = require("../lib/backup/getService");
const parserJSONData = require("../lib/restore/parserJSONData");
const dataCompare = require("../lib/restore/dataCompare");
const parseDataCreate = require("../lib/restore/parseDataCreate");
/**
 * 이 전에 백업해 놓은 파일을 사용자에게 받아 DB와 파일을 복구시키는 기능을 수행하는 미들웨어.
 * 1. board서비스는 데이터에 대해 검증과정을 거치기 위해서 유저에 대한 정보가 필요하다.
 *    때문에 _id를 사용하여 유저 정보를 가져온다.
 * 2. 먼저 파일의 타입을 구분하여 zip파일인지 json파일인지 구분하게 된다. 
 *    이외의 파일 형식은 에러 메세지를 반환하게 된다.
 * 3. 파일을 데이터로 읽어오는 과정이다. 파일이 손상되었을 경우 에러를 반환한다.
 * 3-1. 만약 zip 파일을 받았을 경우 압축을 해제 한 뒤 json 파일을 변수에 담는다.
 * 3-2. 만약 json 파일을 받았을 경우 json파일을 변수에 담는다.
 * 4. 이후 복구에 필요한 데이터인지 비교를 위해 DB에 저장된 데이터를 가져온다.
 * 5. 이 전에 읽어온 복구 데이터를 원하는 구조상태로 분리한다. 
 *    (rootKey와 조인하지 않은 이전 상태로 되돌린다.)
 * 6. DB데이터와 복구 데이터를 비교하여 복구 대상을 선별한다.
 * 7. 선별된 파일과 데이터를 서버와 DB에 저장시킨다.
 * feathers 후크를 제외하고 미들웨어가 끝나면 response를 보내주게 된다.
 */
module.exports = async (req, res, next) => {
  req.connection.setTimeout(60 * 120 * 1000)

  if (req.method === "POST") {
    let startTime = process.uptime();
    let user = await req.app.service("user").get(req.body.user, {
      headers: req.headers,
    });
    let jsonData;
    let filePath = path.join(__dirname, "../../", req.file.destination + "/");
    let fileName = req.file.filename;
    let fileFullPath = path.join(filePath, fileName);

    if (req.file.mimetype === "application/zip") {
      jsonData = await unzip(req.file).catch((error) => {
        console.log(error);
        fs.unlinkSync(fileFullPath);
        return res.status(400).send({
          error: "The file cannot be read.",
          description: "The file is corrupted.",
        });
      });
      if (!jsonData) {
        return res.status(500).send({
          error: "unexpected end of file",
          description: "unexpected end of file",
        });
      }
      // // json file로 받을 경우
    // } else if (req.file.mimetype === "application/json") {
    //   try {
    //     jsonData = require(fileFullPath);
    //   } catch (error) {
    //     fs.unlinkSync(fileFullPath);
    //     return res.status(400).send({
    //       error: 'The file cannot be read.',
    //       description: 'The file is corrupted.',
    //   })
    //   }
    //   if (fs.existsSync(fileFullPath)) {
    //     fs.unlinkSync(fileFullPath);
    //   }
    } else {
        // throw new errors.BadRequest("File format not supported");
        fs.unlinkSync(fileFullPath);
        return res.status(400).send({
          error: 'File type not matching.',
          description: 'File format not supported.',
      })
    }

    let serviceData = await getService(req, user);
    let jsonParserData = await parserJSONData(jsonData);
    let compareData = dataCompare(serviceData, jsonParserData);
    let division = false;
      for (const key in compareData) {
      if (compareData[key].length > 0) {
        division = true;
      }
    }
    if(division){
      parseDataCreate(user, req, compareData);
      res.send("success");
    }else{
      res.send("exist");
      let endTime = process.uptime();
console.log("main thread time: " + (endTime - startTime)); 
    }
    return;
  }
  next();
};

