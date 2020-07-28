const fs = require('fs');
/**
 * 파일을 바이너리 스트링으로 변경
 *
 * @param {string} file 서버 내 파일 이름
 * @returns 바이너리 스트링데이터 반환
 */

 module.exports = (file) => {
    const readFile = fs.readFileSync(file);
    const stream = fs.createReadStream(file)
    fs.createWriteStream
    console.log(readFile);
    console.log(stream);
 }

//  let bufferFile = fs.readFileSync('./1594887015286-스크린샷 2020-07-13 오전 11.23.21.png');
//  fs.writeFileSync('./file_copy.png',bufferFile);