const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
// const { Worker } = require('worker_threads');

const getService = require("../lib/backup/getService");
const dataParser = require("../lib/backup/dataParser");
const fileConverter = require("../lib/backup/fileConverter");
const createCompressedFile = require("../lib/backup/createCompressedFile");
const jsonToStringify = require("../lib/common/jsonToStringify");
const createCompressedFileCLI = require("../lib/backup/createCompressedFileCLI");
/**
 * 백업 미들웨어
 * 1. board서비스는 데이터에 대해 검증과정을 거치기 위해서 유저에 대한 정보가 필요하다.
 *    때문에 _id를 사용하여 유저 정보를 가져온다.
 * 2. getService 백업에 필요한 데이터를 DB에서 가져온다.
 * 3. dataParser 데이터를 가공하여 rootKey에 모든 데이터를 조인한다.
 * 4. fileConverter 조인된 데이터를 Stream형식으로 .json파일로 write하고
 * 5. createCompressedFile .json파일을 압축하여 다시한번 Stream 형식으로 .zip을 제작한다.
 * feathers 후크를 제외하고 미들웨어가 끝나면 response를 보내주게 된다.
 */
module.exports = async (req, res, next) => {
  console.time("backup");
  req.connection.setTimeout(60 * 300 * 1000);
  console.log(req.method);
  //   let myWorker1,
  //     myWorker2,
  //     myWorker3,
  //     myWorker4,
  //     myWorker5,
  //     myWorker6,
  //     myWorker7,
  //     myWorker8,
  //     myWorker9,
  //     myWorker10;
  //   let workerPath = path.join(__dirname , '../lib/backup/createCompressedFile.js')
  // myWorker1 = new Worker(workerPath); // 스레드를 생성해 파일 절대경로를 통해 가리킨 js파일을 작업
  // myWorker2 = new Worker(workerPath);
  // myWorker3 = new Worker(workerPath);
  // myWorker4 = new Worker(workerPath);
  // myWorker5 = new Worker(workerPath);
  // myWorker6 = new Worker(workerPath);
  // myWorker7 = new Worker(workerPath);
  // myWorker8 = new Worker(workerPath);
  // myWorker9 = new Worker(workerPath);
  // myWorker10 = new Worker(workerPath);

  // 처음 백업 요청 시 Post로 받기
  if (req.method === "POST") {
    let startTime = process.uptime();
    let user = await req.app.service("user").get(req.body.user, {
      headers: req.headers,
    });

    const serviceData = await getService(req, user);
    const parserData = await dataParser(serviceData, req);
    if (parserData.jsonDocument[parserData.rootKey].length < 1) {
      return res.status(500).send({
        error: "There is no data to be backed up.",
        description: "There is no data to be backed up.",
      });
    } else {
      const fileInfo = await fileConverter(parserData.jsonDocument);
      await createCompressedFile(
        parserData.uploadFileData,
        fileInfo,
        res,
        startTime
      );
    }

    //   if (fileExists && stream) {
    //     res.writeHead(200, {
    //       "Content-Type": mimetype,
    //       "Content-Disposition": "attachment; filename=" + '1597048454455_fileCompressed.zip',
    //     });
    //   } else {
    //     res.statusCode = 404;
    //     res.end();
    //     throw new errors.NotFound("File not found.");
    //   }

    //   stream.on("data", (chunk) => {
    //     // console.log(`Received ${chunk.length} bytes of data.`);
    //     console.log(`전송 데이터 청크 ${chunk.length} bytes.`);

    //     if(!res.write(chunk)){
    //     console.log('pause');
    //       stream.pause();
    //   }
    //   });

    //   stream.on("end", () => {
    //     console.log("파일 전송 끝");
    //     // remove zip file
    //     // fs.unlink(zipFilePath, function (err) {
    //     //   if (err) throw new errors.NotFound("File not found.");
    //     //   console.log("file deleted");
    //     // });

    //     res.end();
    //   });
    //   res.on("drain", function () {
    //     console.log('drain');
    //     stream.resume();
    //  });

    //   stream.pipe(res);
    console.timeEnd("backup");
    return;
  }

  // 클라이언트가 서버에서 받은 URL을 통해 다시 GET요청을 받았을 때 
  // 삭제요청에 필요한 쿠키 정보들과 zip파일을 보내준다.
  if (req.method === "GET") {
    console.log('file downlaod');
    // let zipFilePath = path.join(
    //   __dirname,
    //   "../../",
    //   "/upload" + `/${req.query.fileName}`
    // );
    let zipFilePath = path.join(
      __dirname,
      "../../",
      "/backup_file" + `/${req.query.fileName}`
    );
    console.log(zipFilePath);
    let stream;
    // 경로 체크 및 스트림으로 생성
    let mimetype = mime.getType(zipFilePath);
    let fileExists = fs.existsSync(zipFilePath);
    stream = fs.createReadStream(zipFilePath);
    console.log(fileExists, mimetype);
    try {
      if(fileExists){
        res.append("Set-Cookie",`download=success;`);
        res.append('Set-Cookie', `fileName=${req.query.fileName}`);
  
        await res.sendFile(
          zipFilePath,
          { headers: { "Content-Type": mimetype } },
          () => {
            console.log("file send end");
          }
        );
      }else{
        res.append("Set-Cookie",`download=failure;`);
        return res.status(500).send({
          error: "File not found",
          description: "File not found.",
        });
      }
      
    } catch (error) {
      console.log(error);
    }
    return;
  }

  if (req.method === "DELETE") {
    let removeFilePath = path.join(
      __dirname,
      "../../",
      "/backup_file" + `/${req.query.fileName}`
    );
    // let removeFilePath = path.join(
    //   __dirname,
    //   "../../",
    //   "/upload" + `/${req.query.fileName}`
    // );
    try {
      if(fs.existsSync(removeFilePath)){
        fs.unlink(removeFilePath, function (err) {
          if (err) throw new errors.NotFound("File not found.");
          console.log("file deleted");
        });
        res.send('delete file');
      }
      
    } catch (error) {
      console.log(error);
    }
    return;
  }
  next();
};

// res.writeHead(200, {
//             "Content-Type": "application/zip",
//             "Content-Disposition": "attachment; filename="+res.hook.data.filename,
//           });
// stream.pipe(res)
//       res.end();

//       res.type("zip");
//       await res.download(zipFilePath, zipFileName, function (err) {
//         if (err) {
//           // 에러 처리
//           console.log(err);
//           res.statusCode = 404;
//           res.end();
//           throw new errors.NotFound("File not found.");
//         } else {
//           // 성공
//           console.log("success");
//         }
//       });
//   let parentComment = await res.hook.app.service("comment").find(
//     {
//       user: {
//         strategy: "local",
//         email: req.body.email,
//         password: req.body.password,
//       },
//     },
//     {
//       query: {},
//       route: {},
//       provider: "rest",
//       headers: req.headers,
//     }
//   );

// let options = {
//   root: path.join(__dirname, '../../','backup_file'),
//   dotfiles: 'deny',
//   headers: {
//     "Content-Type": mimetype,
//   "Content-Disposition": "attachment; filename=" + zipFileName
//   }
// }
// res.sendFile(zipFileName, options, function (err) {
//   if (err) {
//     next(err)
//   } else {
//     console.log('Sent:', zipFileName)
//   }
// })

// res.type("zip");
//       await res.download(zipFilePath, zipFileName, function (err) {
//         if (err) {
//           // 에러 처리
//           console.log(err);
//           res.statusCode = 404;
//           res.end();
//           throw new errors.NotFound("File not found.");
//         } else {
//           // 성공
//           console.log("success");
//         }
//       });


// async function sendFile() {
//   return new Promise((resolve, reject) => {
//     res.sendFile(
//       zipFilePath,
//       { headers: { "Content-Type": mimetype } },
//       () => {
//         console.log("file send end");
//         resolve(true);
//       }
//     );
//   })
//     .then(() => {
//       console.log("end ");
//     })
//     .catch(() => {
//       console.log("error");
//     });
// }