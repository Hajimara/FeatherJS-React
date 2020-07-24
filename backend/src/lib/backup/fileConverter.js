const jsonfile = require("jsonfile");
const fs = require("fs");
const path = require("path");

module.exports = async (data) => {
    let filename = String(new Date().getTime()).toString() + "_fileConverter.json";
  let filePath = path.join(
    __dirname,
    "/../../..",
    "/backup_file",
    filename,
  );
  try {
    fs.writeFileSync(filePath, JSON.stringify(data), (error) => {
      if (error) console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
  return {filePath,filename};
};
