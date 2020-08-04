const FormData = require("formdata-node");
const binaryDataCreater = require("./binaryDataCreater");
const { ObjectID } = require("mongodb");
/**
 * 선별한 데이터를 토대로 DB에 데이터를 등록하는 함수이다.
 */
module.exports = (user, req, compareData) => {
  console.log(compareData);
  for (const compareKey in compareData) {
    compareData[compareKey].map((compareItem, compareIndex) => {
      if (compareKey === "board") {
        let formData = new FormData();
        for (const key in compareItem) {
          if (getClassType(compareItem[key]) === "Object") {
            
          } else if (
            getClassType(compareItem[key]) === "Array" &&
            (key === "files" || key === "file")
          ) {
            compareItem[key].forEach((file, index) => {
              binaryDataCreater(file.binary, file.serverFileName)
            });
          } else {
            
          }
        }
        (async () => {
          const result = await req.app.service(compareKey).create(compareItem, {
            user,
            query: {},
            route: {},
            provider: "rest",
            headers: req.headers,
          });
          console.log(result);
        })();
      } else {

        (async () => {
          const result = await req.app.service(compareKey).create(compareItem, {
            user,
            query: {},
            route: {},
            provider: "rest",
            headers: req.headers,
          });
          console.log(result);
        })();
      }
    });
  }

  return;
};

function getClassType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}