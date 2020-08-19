const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const mime = require("mime");
const errors = require("@feathersjs/errors");
const pidusage = require("pidusage");
const cmd = require("node-cmd");
const PromiseBluebird = require("bluebird");

/**
 * Stream형식으로 파일을 압축시켜 .zip파일을 사용자에게 response해준다.
 * 경로 수정
 * @param {object} fileInfo JSON File의 경로와 이름을 담고있는 객체
 * @param {object} uploadFileData 압축할 파일 경로 데이터
 * @param {*} res
 */
module.exports = async (uploadFileData, fileInfo, res, startTime) => {
  if (!fs.existsSync(fileInfo.fileFullPath)) {
    throw new errors.NotFound("File not found.");
  }
  pidusage(process.pid, function (err, stats) {
    console.log(stats);
  });
  let used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }

  let filename =
    String(new Date().getTime()).toString() + "_fileCompressed.zip";
  let jsonFileName = fileInfo.filename;
  try {
    let fileList;
    fileList = `"${jsonFileName}" `;
    uploadFileData.forEach((fileItem) => {
      fileList += `"${fileItem.filename}" `;
    });
    const getAsync = PromiseBluebird.promisify(cmd.get, {
      multiArgs: true,
      context: cmd,
    });
    
    async function createZipCommand() {
      return new Promise(async (resolve, reject) => {
        console.log(fileList);
        getAsync(
          `cd upload
            zip -r ${filename} ${fileList}
            `
        )
          .then(() => {
            let endTime = process.uptime();
            console.log("main thread time: " + (endTime - startTime));
            pidusage(process.pid, function (err, stats) {
              console.log(stats);
            });
            used = process.memoryUsage();
            for (let key in used) {
              console.log(
                `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
              );
            }
            
            setTimeout(() => {
              fs.unlink(fileInfo.fileFullPath, function (err) {
                if (err) throw new errors.NotFound("File not found.");
                console.log("file deleted");
              });
              res.append("Set-Cookie", `download=success;`);
              res.send(`http://localhost:3030/backup?fileName=${filename}`);
              resolve(true);
            }, 5000);
          })
          .catch(() => {
            console.log("error");
            fs.unlink(fileInfo.fileFullPath, function (err) {
              if (err) throw new errors.NotFound("File not found.");
              console.log("file deleted");
            });
            res.append("Set-Cookie", `download=failure;`);
            reject;
          });
      });
    }

    let promiseData = await Promise.all([createZipCommand()]);
    console.log('promiseData : ',promiseData);
  } catch (error) {
    console.log(error);
  }
  return ;
};
