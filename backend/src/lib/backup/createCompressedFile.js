const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const mime = require("mime");
const errors = require("@feathersjs/errors");
const pidusage = require("pidusage");

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
  let zipFilePath = path.join(__dirname, "/../../..", "/backup_file", filename);
  var output = fs.createWriteStream(zipFilePath);
  var archive = archiver("zip", {
    zlib: { level: 1 }, // Sets the compression level.
  });

  try {
    output.on("close", async function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      pidusage(process.pid, function (err, stats) {
        console.log(stats);
      });
      used = process.memoryUsage();
      for (let key in used) {
        console.log(
          `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
        );
      }

      let stream;
      // 경로 체크 및 스트림으로 생성
      let mimetype = mime.getType(zipFilePath);
      // let fileExists = fs.existsSync(zipFilePath);
      // stream = fs.createReadStream(zipFilePath);
      let endTime = process.uptime();
      console.log("main thread time: " + (endTime - startTime));
      
      // res.sendFile(
      //   zipFilePath,
      //   { headers: { "Content-Type": mimetype } },
      //   () => {
      //     console.log("end file delete");
      //     // fs.unlink(zipFilePath, function (err) {
      //     //   if (err) throw new errors.NotFound("File not found.");
      //     //   console.log("file deleted");
      //     // });
          fs.unlink(fileInfo.fileFullPath, function (err) {
            if (err) throw new errors.NotFound("File not found.");
            console.log("file deleted");
          });
          res.append(
            "Set-Cookie",
            `download=success;`
          );
          res.send(`http://localhost:3030/backup?fileName=${filename}`)
      //   }
      // );
    });

    output.on("end", function () {
      console.log("Data has been drained");
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.on("data", function (chunk) {
      // console.log(`집 파일 데이터 청크 ${chunk.length} bytes `);
    });

    // pipe archive data to the file
    archive.pipe(output);

    archive.append(fs.createReadStream(fileInfo.fileFullPath), {
      name: fileInfo.filename,
    });
    uploadFileData.forEach((pathItem) => {
      const fullPath = path.join(pathItem.filePath, pathItem.filename);
      // console.log(fullPath);
      archive.append(fs.createReadStream(fullPath), {
        name: pathItem.filename,
      });
    });
    archive.finalize();
  } catch (error) {
    console.log(error);
  }
  return { zipFilePath, filename };
};
