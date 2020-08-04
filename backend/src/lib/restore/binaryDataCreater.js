const fs = require('fs');
const path = require('path');

module.exports = (buffer,fileName) => {
  let filePath = path.join( __dirname, "../../../",  "upload/",fileName);
  fs.writeFileSync(filePath,Buffer.from(buffer))
  return ;
};