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
  // 바이너리 데이터를 압축할 때 압축 강도가 쎄면 데이터 손실이 있을 수 있으므로 
  // 압축 강도는 0 또는 1로 지정한다 . 1은 속도가 빠른 대신 압축강도가 낮고 9로 갈수록
  // 압축강도가 쎄고 압축 속도가 느리다.
  var archive = archiver("zip", {
    zlib: { level: 1 }, // Sets the compression level.
  });

  try {
    output.on("close", async function () {
      // 압축을 끝낸 후 뒤처리 콜백 함수이다.
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

      // let stream;
      // 경로 체크 및 스트림으로 생성
      // let mimetype = mime.getType(zipFilePath);
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
      // res.append(
      //   "Set-Cookie",
      //   `download=success;`
      // );
      // json 파일을 삭제하고 브라우저가 zip파일을 다운받을 수 있는 URL을 클라이언트한테 전송한다.
          fs.unlink(fileInfo.fileFullPath, function (err) {
            if (err) throw new errors.NotFound("File not found.");
            console.log("file deleted");
          });
          
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
    // 압축 파일 이름과 경로를 지정해 넣어준다.
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
