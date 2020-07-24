const fs = require("fs");
const path = require("path");
const zip = new require("node-zip")();

module.exports = async (fileInfo) => {
  let filename =
    String(new Date().getTime()).toString() + "_fileCompressed.zip";
  let zipFilePath = path.join(__dirname, "/../../..", "/backup_file", filename);
  try {
    zip.file(fileInfo.filename, fs.readFileSync(fileInfo.filePath));
    let data = zip.generate({ base64: false, compression: "DEFLATE" });
    fs.writeFileSync(zipFilePath, data, "binary", function (err) {
      if (err) console.log(err);
    });
    fs.unlinkSync(fileInfo.filePath);
  } catch (error) {
    console.log(error);
  }
  return { zipFilePath, filename };
};
