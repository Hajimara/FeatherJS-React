const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

const getService = require("../lib/backup/getService");
const dataParser = require("../lib/backup/dataParser");
const fileConverter = require("../lib/backup/fileConverter");
const createCompressedFile = require("../lib/backup/createCompressedFile");
module.exports = async (req, res, next) => {
  if (req.method === "GET") {
    let user = await req.app.service("user").get(req.params.__feathersId, {
      headers: req.headers,
    });

    const serviceData = await getService(req, user);
    const parserData = await dataParser(serviceData);
    const fileInfo = await fileConverter(parserData);
    const zipFile = await createCompressedFile(fileInfo);

    let zipFilePath = zipFile.zipFilePath;
    let zipFileName = zipFile.filename;

    let stream;
    // 경로 체크 및 스트림으로 생성
    let mimetype = mime.getType(zipFilePath);
    let fileExists = fs.existsSync(zipFilePath);
    stream = fs.createReadStream(zipFilePath);

    if (fileExists && stream) {
      res.writeHead(200, {
                    "Content-Type": mimetype,
                    "Content-Disposition": "attachment; filename="+zipFileName,
                  });
        
       
      // res.type("zip");
      // return res.download(zipFilePath, zipFileName, function (err) {
      //   if (err) {
      //     // 에러 처리
      //     console.log(err);
      //     res.statusCode = 404;
      //     res.end();
      //     throw new errors.NotFound("File not found.");
      //   } else {
      //     // 성공
      //     console.log("success");
      //   }
      // });
    } else {
      res.statusCode = 404;
      res.end();
      throw new errors.NotFound("File not found.");
    }
    // header 설정 및 전송
    // res.end();
    stream.pipe(res)
    return;
    // return;
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
