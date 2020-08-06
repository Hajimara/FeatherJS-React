// const jsonfile = require("jsonfile");
const fs = require("fs");
const path = require("path");

module.exports = async (data) => {
  let filename =
    String(new Date().getTime()).toString() + "_fileConverter.json";
  let filePath = path.join(__dirname, "/../../..", "/backup_file");
  let fileFullPath = path.join(filePath,filename)
  if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath)
  }
  let output = fs.createWriteStream(fileFullPath);
  try {
    output.write(JSON.stringify(data),'utf-8');

    output.end();

    output.on('finish', function() {
      console.log("Write completed.");
      
   });
   
   output.on('error', function(err) {
      console.log(err.stack);
   });

  } catch (error) {
    console.log(error);
  }
  return { fileFullPath, filename };
};








// module.exports = async (data) => {
//   let filename =
//     String(new Date().getTime()).toString() + "_fileConverter.json";
//   let filePath = path.join(__dirname, "/../../..", "/backup_file", filename);
//   try {
    
//     fs.writeFileSync(filePath, JSON.stringify(data), (error) => {
//       if (error) console.log(error);
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   return { filePath, filename };
// };
