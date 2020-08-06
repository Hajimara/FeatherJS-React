const fs = require("fs");
const path = require("path");

module.exports = (buffer, fileName) => {
  try {
    let filePath = path.join(__dirname, "../../../", "upload/", fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
  } catch (error) {
    console.log(error);
  }
  return;
};
