const fs = require("fs");
const path = require("path");
/**
 * Stream 형식으로 .json파일을 write하는 함수이다.
 * 경로 수정
 *
 * @param {object} data JSON형식으로 파싱된 데이터
 */
module.exports = async (data) => {
  let filename =
    String(new Date().getTime()).toString() + "_fileConverter.json";
  let filePath = path.join(__dirname, "/../../..", "/backup_file");
  let fileFullPath = path.join(filePath, filename);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  async function wirteToFile() {
    return new Promise((resolve, reject) => {
      let output = fs.createWriteStream(fileFullPath);
      output.write(JSON.stringify(data), "utf-8");
      output.end();

      output.on("finish", function () {
          console.log("Write completed.");
        resolve(true);
      });

      output.on("error", function (err) {
        if (fs.existsSync(fileFullPath)) {
          fs.unlinkSync(fileFullPath);
        }
        reject;
      });
    });
  }
  await wirteToFile();
  return { fileFullPath, filename };
};

// const fs = require("fs");
// const path = require("path");
// /**
//  * Stream 형식으로 .json파일을 write하는 함수이다.
//  * 경로 수정
//  *
//  * @param {object} data JSON형식으로 파싱된 데이터
//  */
// module.exports = async (data) => {
//   let filename =
//     String(new Date().getTime()).toString() + "_fileConverter.json";
//   let filePath = path.join(__dirname, "/../../..", "/backup_file");
//   let fileFullPath = path.join(filePath, filename);
//   if (!fs.existsSync(filePath)) {
//     fs.mkdirSync(filePath);
//   }
//   let output = fs.createWriteStream(fileFullPath);
//   try {
//     output.write(JSON.stringify(data), "utf-8");

//     output.end();

//     output.on("finish", function () {
//       console.log("Write completed.");
//     });

//     output.on("error", function (err) {
//       console.log(err.stack);
//     });
//   } catch (error) {
//     console.log(error);
//     if (fs.existsSync(fileFullPath)) {
//       fs.unlinkSync(fileFullPath);
//     }
//     return res.status(500).send({
//       error: "Failed to create file.",
//       description: "The file is corrupted.",
//     });
//   }
//   return { fileFullPath, filename };
// };
