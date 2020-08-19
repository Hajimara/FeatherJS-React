const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const pidusage = require("pidusage");
/**
 * multer에서 받아온 zip 파일 정보로 압축해제를 진행하는 함수이다.
 * 압축해제는 stream형식으로 진행하며 zip파일 내부의 정보를 하나씩 꺼내어 작업하게 된다.
 *
 * @param {object} file
 */
module.exports = async (file) => {
  const fileName = file.filename;
  const filePath = path.join(__dirname, "../../../", file.destination + "/");
  const fileFullPath = path.join(filePath, fileName);
  let jsonData;
  let fp;
  let fileArray = [];
  if (!fs.existsSync(fileFullPath)) {
    throw new errors.NotFound("File not Found");
  }
  pidusage(process.pid, function (err, stats) {
    console.log(stats);
    // => {
    // cpu : 10.0, // 백분율 (0 ~ 100 * vcore)
    // 메모리 : 357306368, // 바이트
    // ppid : 312, // PPID
    // pid : 727, // PID
    // ctime : 867000, // ms 사용자 + 시스템 시간
    // 경과 : 6650000, // 프로세스 시작 이후 ms
    // 타임 스탬프 : 864000000 // epoch 이후의 ms
    //}
  });
  let used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
  try {
    const directory = await unzipper.Open.file(fileFullPath);
    let zipFile = directory.files;
    async function promiseStream(item) {
      return new Promise((resolve, reject) => {
        let itemFileName = item.path;
        if (String(itemFileName).slice(-5) === ".json") {
          fp=null;
          fp = filePath + itemFileName;
        }
        if (!fs.existsSync(filePath + itemFileName)) {
          item
            .stream()
            .pipe(fs.createWriteStream(filePath + itemFileName))
            .on("error", () => {
              console.log("error" + itemFileName);
              fileArray.push(filePath + itemFileName);
              reject;
            })
            .on("finish", () => {
              console.log("finished file" + itemFileName);
              fileArray.push(filePath + itemFileName);
              pidusage(process.pid, function (err, stats) {
                console.log(stats);
              });
              used = process.memoryUsage();
              for (let key in used) {
                console.log(
                  `${key} ${
                    Math.round((used[key] / 1024 / 1024) * 100) / 100
                  } MB`
                );
              }
              resolve(true);
            });
        } else {
          console.log("finished file" + itemFileName);
          resolve(true);
        }
      });
    }

    let dd = await Promise.all(zipFile.map((item) => promiseStream(item))).then(
      () => {
        console.log("success unzip");
      }
    );

    // console.log(dd);
    
    // let jsonFileData =null;
    // jsonFileData = require(fp);
    // jsonFileData = require(fp);
    // jsonFileData = require(fp);
    let rawdata = fs.readFileSync(fp);
let jsonFileData = JSON.parse(rawdata);

    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
    }
    if (fs.existsSync(fileFullPath)) {
      fs.unlinkSync(fileFullPath);
    }

    return jsonFileData;
  } catch (error) {
    console.log(error);
    fileArray.forEach((item) => {
      fs.unlinkSync(item);
    });
    fs.unlinkSync(fileFullPath);
  }
  return jsonFileData;
};
