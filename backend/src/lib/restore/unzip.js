const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

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

  try {
    // async function main() {
    //   const directory = await unzipper.Open.file(fileFullPath);
    //   // console.log('directory', directory);
    //   return new Promise((resolve, reject) => {
    //     directory.files.map((item) => {
    //       let itemFileName = item.path;
    //       if (String(itemFileName).slice(-5) === ".json") {
    //         fp = filePath + itemFileName;
    //       }
    //       if (!fs.existsSync(filePath + itemFileName)) {
    //         item
    //           .stream()
    //           .pipe(fs.createWriteStream(filePath + itemFileName))
    //           .on("error", reject)
    //           .on("finish", ()=>{
    //             resolve
    //           });
    //       }
    //     });
    //   });
    // }

    // let d = await main();
    const directory = await unzipper.Open.file(fileFullPath);
    let zipFile = directory.files;
    async function promiseStream(item) {
      return new Promise((resolve, reject) => {
        let itemFileName = item.path;
        if (String(itemFileName).slice(-5) === ".json") {
          fp = filePath + itemFileName;
        }
        if (!fs.existsSync(filePath + itemFileName)) {
          item
            .stream()
            .pipe(fs.createWriteStream(filePath + itemFileName))
            .on("error", ()=>{
              console.log('error'+itemFileName);
              reject
            })
            .on("finish", () => {
              console.log('finished file'+itemFileName);
              resolve(true);
            });
        }else{
          console.log('finished file'+itemFileName);
              resolve(true);
        }
      });
    }

    let dd = await Promise.all(zipFile.map((item) => promiseStream(item))).then(()=>{
      console.log('success unzip');
    });

    console.log(dd);
    jsonData = require(fp);

    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
    }
    if (fs.existsSync(fileFullPath)) {
      fs.unlinkSync(fileFullPath);
    }
  } catch (error) {
    console.log(error);
    fileArray.forEach((item) => {
      fs.unlinkSync(item);
    });
    fs.unlinkSync(fileFullPath);
  }
  return jsonData;
};

// const errors = require("@feathersjs/errors");
// const fs = require("fs");
// const path = require("path");
// const unzipper = require("unzipper");

// module.exports = async (file) => {
//   const fileName = file.filename;
//   const filePath = path.join(__dirname, "../../../", file.destination + "/");
//   const fileFullPath = path.join(filePath, fileName);
//   let jsonData;
//   let fp;
//   let fileArray = []
//   if (!fs.existsSync(fileFullPath)) {
//     throw new errors.NotFound("File not Found");
//   }

//   try {
//     const zip = fs
//       .createReadStream(fileFullPath)
//       .pipe(unzipper.Parse({ forceStream: true }));
//     for await (const entry of zip) {
//       let fileName = entry.path;
//       let type = entry.type;
//       let size = entry.vars.uncompressedSize;
//       console.log(fileName, type, size);

//       if (fileName.slice(-5) === ".json") {
//         fp = filePath + fileName;
//       }
//       if (!fs.existsSync(filePath + fileName)) {
//         fileArray.push(filePath + fileName);
//         entry.pipe(fs.createWriteStream(filePath + fileName));
//       } else {
//         entry.autodrain();
//       }
//     }
//     jsonData = require(fp);

//     if (fs.existsSync(fp)) {
//       fs.unlinkSync(fp);
//     }
//     if (fs.existsSync(fileFullPath)) {
//       fs.unlinkSync(fileFullPath);
//     }
//   } catch (error) {
//     console.log(error);
//     fileArray.forEach((item)=>{
//       fs.unlinkSync(item);
//     })
//     fs.unlinkSync(fileFullPath);

//   }
//   return jsonData;
// };
