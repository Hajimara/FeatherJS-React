const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
module.exports = async (file) => {
  const fileName = file.filename;
  const filePath = path.join(__dirname, "../../../", file.destination + "/");
  const fileFullPath = path.join(filePath, fileName);
  let jsonData
  let fp;
  if (!fs.existsSync(fileFullPath)) {
    throw new errors.NotFound("File not Found");
  }
  try {
    const zip = fs
      .createReadStream(fileFullPath)
      .pipe(unzipper.Parse({ forceStream: true }));
    for await (const entry of zip) {
      let fileName = entry.path;
      let type = entry.type;
      let size = entry.vars.uncompressedSize;
      console.log(fileName, type, size);
      fp = filePath + fileName;
      if (fileName) {
        entry.pipe(fs.createWriteStream(filePath + fileName));
      } else {
        entry.autodrain();
      }
    }
    jsonData = require(fp);

    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
    }
    if (fs.existsSync(fileFullPath)) {
      fs.unlinkSync(fileFullPath);
    }
  } catch (error) {
    fs.unlinkSync(fileFullPath);
    return res.status(400).send({
      error: "The file cannot be read.",
      description: "The file is corrupted.",
    });

  }
  return jsonData;
};
