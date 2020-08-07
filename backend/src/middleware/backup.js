const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

const getService = require("../lib/backup/getService");
const dataParser = require("../lib/backup/dataParser");
const fileConverter = require("../lib/backup/fileConverter");
const createCompressedFile = require("../lib/backup/createCompressedFile");
module.exports = async (req, res, next) => {
  if (req.method === "POST") {
    let user = await req.app.service("user").get(req.body.user, {
      headers: req.headers,
    });
    
    const serviceData = await getService(req, user);
    const parserData = await dataParser(serviceData,res);
    if(parserData.jsonDocument[parserData.rootKey].length < 1 ){
      return res.status(500).send({
        error: "There is no data to be backed up.",
        description: "There is no data to be backed up.",
      });
    }else{
      const fileInfo = await fileConverter(parserData.jsonDocument);
      await createCompressedFile(fileInfo, res);
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
