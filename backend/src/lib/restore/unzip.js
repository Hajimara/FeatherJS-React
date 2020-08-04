const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
module.exports = async (file) => {
  const fileName = file.filename;
  const filePath = path.join(__dirname, "../../../", file.destination+'/');
  // const filePath = path.join(__dirname, "../../../../", file.destination+'/');
  console.log(filePath);
  
  const fileFullPath = path.join(
    filePath,
    fileName
  );
  console.log(fileFullPath);
  
  let fp;
  const zip = fs.createReadStream(fileFullPath).pipe(unzipper.Parse({forceStream: true}));
  for await (const entry of zip) {
    let fileName = entry.path;
    let type = entry.type; 
    let size = entry.vars.uncompressedSize;
    console.log(fileName, type, size);
    fp=filePath+fileName;
    if (fileName) {
      entry.pipe(fs.createWriteStream(filePath+fileName));
    } else {
      entry.autodrain();
    }
  }
  let jsonData = require(fp);
  return jsonData;
};
