const fs = require("fs");
const path = require("path");

// 받아온 이진 데이터를 파일로 변환하는 작업을 한다.
module.exports = (buffer, fileName) => {
  try {
    let filePath = path.join(__dirname, "../../../", "upload/", fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
  } catch (error) {
    console.log(error);
  }
  return;
};
