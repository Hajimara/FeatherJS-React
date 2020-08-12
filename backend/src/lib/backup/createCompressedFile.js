const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const mime = require("mime");
const errors = require("@feathersjs/errors");
/**
 * Stream형식으로 파일을 압축시켜 .zip파일을 사용자에게 response해준다.
 * 경로 수정
 * @param {object} fileInfo JSON File의 경로와 이름을 담고있는 객체
 * @param {object} uploadFileData 압축할 파일 경로 데이터
 * @param {*} res
 */
module.exports = async (uploadFileData, fileInfo, res) => {
  let startTime = process.uptime();  
  if (!fs.existsSync(fileInfo.fileFullPath)) {
    throw new errors.NotFound("File not found.");
  }

  let filename =
    String(new Date().getTime()).toString() + "_fileCompressed.zip";
  let zipFilePath = path.join(__dirname, "/../../..", "/backup_file", filename);
  var output = fs.createWriteStream(zipFilePath);
  var archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  try {
    output.on("close", async function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      let stream;
      // 경로 체크 및 스트림으로 생성
      let mimetype = mime.getType(zipFilePath);
      // let fileExists = fs.existsSync(zipFilePath);
      // stream = fs.createReadStream(zipFilePath);
      let endTime = process.uptime();
console.log("main thread time: " + (endTime - startTime)); 
        res.sendFile(zipFilePath, { headers: { "Content-Type": mimetype } },()=>{
          console.log('end file delete');
          fs.unlink(zipFilePath, function (err) {
            if (err) throw new errors.NotFound("File not found.");
            console.log("file deleted");
          });
          fs.unlink(fileInfo.fileFullPath, function (err) {
            if (err) throw new errors.NotFound("File not found.");
            console.log("file deleted");
          });
        });
      
      //   if (fileExists && stream) {
      //     res.writeHead(200, {
      //       "Content-Type": mimetype,
      //       "Content-Disposition": "attachment; filename=" + filename,
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
      // remove zip file

      //     res.end();
      //   });
      //   res.on("drain", function () {
      //     console.log('drain');
      //     stream.resume();
      //  });

      //   stream.pipe(res);

      // remove json file
      // fs.unlink(fileInfo.fileFullPath, function (err) {
      //   if (err) throw new errors.NotFound("File not found.");
      //   console.log("file deleted");
      // });
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
      console.log(fullPath);
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
