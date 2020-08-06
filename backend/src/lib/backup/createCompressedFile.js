const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const mime = require("mime");
const { errors } = require("@feathersjs/errors");
/**
 * 
 * @param {object} fileInfo JSON File의 경로와 이름을 담고있는 객체
 * @param {*} res 
 */
module.exports = async (fileInfo, res) => {
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
    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );

      let stream;
      // 경로 체크 및 스트림으로 생성
      let mimetype = mime.getType(zipFilePath);
      let fileExists = fs.existsSync(zipFilePath);
      stream = fs.createReadStream(zipFilePath);

      if (fileExists && stream) {
        res.writeHead(200, {
          "Content-Type": mimetype,
          "Content-Disposition": "attachment; filename=" + filename,
        });
      } else {
        res.statusCode = 404;
        res.end();
        throw new errors.NotFound("File not found.");
      }

      stream.on("data", (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
      });

      stream.on("end", () => {
        console.log("파일 전송 끝");
        // remove zip file
        fs.unlink(zipFilePath, function (err) {
          if (err) throw new errors.NotFound("File not found.");
          console.log("file deleted");
        });
      });
      stream.pipe(res);
      // remove json file
      fs.unlink(fileInfo.fileFullPath, function (err) {
        if (err) throw new errors.NotFound("File not found.");
        console.log("file deleted");
      });
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

    // pipe archive data to the file
    archive.pipe(output);

    archive.append(fs.createReadStream(fileInfo.fileFullPath), {
      name: fileInfo.filename,
    });
    archive.finalize();
  } catch (error) {
    console.log(error);
  }
  return { zipFilePath, filename };
};
