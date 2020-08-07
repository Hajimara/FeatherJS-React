const errors = require("@feathersjs/errors");
const unzip = require("../lib/restore/unzip");
const getService = require("../lib/backup/getService");
const path = require("path");
const parserJSONData = require("../lib/restore/parserJSONData");
const dataCompare = require("../lib/restore/dataCompare");
const parseDataCreate = require("../lib/restore/parseDataCreate");
const fs = require("fs");
/**
 * 이 전에 백업해 놓은 데이터를 복구시키는 기능을 수행하는 미들웨어
 *
 */
module.exports = async (req, res, next) => {
  if (req.method === "POST") {
    let user = await req.app.service("user").get(req.body.user, {
      headers: req.headers,
    });
    let jsonData;
    // let filePath = path.join(__dirname, "../../../", req.file.destination + "/", req.file.filename);
    let filePath = path.join(__dirname, "../../", req.file.destination + "/");
    // console.log(filePath);
    // if(!fs.existsSync(filePath)){
    //   fs.mkdirSync(filePath);
    // }
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
    } else if (req.file.mimetype === "application/json") {
      try {
        jsonData = require(fileFullPath);
      
      } catch (error) {
        fs.unlinkSync(fileFullPath);
        return res.status(400).send({
          error: 'The file cannot be read.',
          description: 'The file is corrupted.',
      })
      }
      if (fs.existsSync(fileFullPath)) {
        fs.unlinkSync(fileFullPath);
      }
    } else {
        // throw new errors.BadRequest("File format not supported");
        fs.unlinkSync(fileFullPath);
        return res.status(400).send({
          error: 'File type not matching.',
          description: 'File format not supported.',
      })
    }
    console.log(getClassType(jsonData));

    let serviceData = await getService(req, user);
    let jsonParserData = await parserJSONData(jsonData);
    let compareData = dataCompare(serviceData, jsonParserData);
    parseDataCreate(user, req, compareData);
    res.send("success");
    return;
  }
  next();
};

function getClassType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}