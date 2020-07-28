const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const mime = require("mime");

module.exports = async (fileInfo, res) => {
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
      stream.pipe(res);
      fs.unlinkSync(fileInfo.filePath);
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

    archive.append(fs.createReadStream(fileInfo.filePath), {
      name: fileInfo.filename,
    });
    archive.finalize();
  } catch (error) {
    console.log(error);
  }
  return { zipFilePath, filename };
};

// module.exports = async (fileInfo) => {
//   let filename =
//     String(new Date().getTime()).toString() + "_fileCompressed.zip";
//   let zipFilePath = path.join(__dirname, "/../../..", "/backup_file", filename);
//   try {
//     zip.file(fileInfo.filename, fs.readFileSync(fileInfo.filePath));
//     let data = zip.generate({ base64: false, compression: "DEFLATE" });
//     fs.writeFileSync(zipFilePath, data, "binary", function (err) {
//       if (err) console.log(err);
//     });
//     fs.unlinkSync(fileInfo.filePath);
//   } catch (error) {
//     console.log(error);
//   }
//   return { zipFilePath, filename };

// };
