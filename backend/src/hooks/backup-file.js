const fs = require("fs");

const getService = require("../lib/backup/getService");
const dataParser = require("../lib/backup/dataParser");
const fileConverter = require("../lib/backup/fileConverter");
const createCompressedFile = require("../lib/backup/createCompressedFile");
module.exports = function (options = {}) {
  return async (context) => {
    const serviceData = await getService(context);

    const parserData = await dataParser(serviceData, context);
    const fileInfo = await fileConverter(parserData);
    const zipFile = await createCompressedFile(fileInfo);
    context.data = {
      filepath: zipFile.zipFilePath,
      filename: zipFile.filename,
    };
    // context.data.filename = zipFile.filename;

    return context;
  };
};
// let stream;
// var fileExists = fs.existsSync(zipFilePath);
// try {
//   if (fileExists) {
//     stream = fs.createReadStream(zipFilePath);
//     context.app.response.writeHead(200, {
//       "Content-Type": "application/zip",
//       "Content-Disposition": "attachment; filename=",
//     });
//   }

// } catch (error) {
//   console.log(error);
// }
// stream.pipe(context.app.response);
