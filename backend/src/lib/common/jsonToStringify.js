const fs = require("fs");
const path = require("path");
const json = require("big-json");
const JSONStream = require("JSONStream");
var jsonWrite = require("json-write");
const _ = require("lodash");
const fastJson = require('fast-json-stringify')
module.exports = async (jsonData) => {
  let filename =
    String(new Date().getTime()).toString() + "_fileConverter.json";
  let filePath = path.join(__dirname, "/../../..", "/backup_file");
  let fileFullPath = path.join(filePath, filename);
    let string;

    (()=>{
        new Promise((resolve, reject) => {
            const stringifyStream = json.createStringifyStream({body: jsonData});
    
            stringifyStream.on("data", function (strChunk) {
              // => BIG_POJO will be sent out in JSON chunks as the object is traversed
              console.log(strChunk);
              string+=strChunk
            });
            stringifyStream.on('end',()=>{
                resolve('완료');
            })
            stringifyStream.on('error',()=>{
                reject('실패');
            })
        }).then(()=>{
            console.log('완료');
        }).catch((error)=>{
            console.log(error);
        })
    })();




  return string;
};
