
const getClassType = require('../common/getClassType');
/**
 * 선별한 데이터를 토대로 DB에 데이터를 등록하고
 * 파일 데이터를 파일로 변환하여 서버에 저장하는 함수이다.
 * 수정
 */
module.exports = (user, req, compareData) => {
  for (const compareKey in compareData) {
    compareData[compareKey].map((compareItem, compareIndex) => {
        (async () => {
          const result = await req.app.service(compareKey).create(compareItem, {
            user,
            query: {},
            route: {},
            provider: "rest",
            headers: req.headers,
          });
        })();
    });
  }
  return;
};


// const FormData = require("formdata-node");

// const binaryDataToFile = require("./binaryDataToFile");
// const getClassType = require('../common/getClassType');
// /**
//  * 선별한 데이터를 토대로 DB에 데이터를 등록하고
//  * 파일 데이터를 파일로 변환하여 서버에 저장하는 함수이다.
//  * 수정
//  */
// module.exports = (user, req, compareData) => {
//   for (const compareKey in compareData) {
//     compareData[compareKey].map((compareItem, compareIndex) => {
//       if (compareKey === "board") {
//         let formData = new FormData();
//         for (const key in compareItem) {
//           // 파일이 존재하면 파일 데이터를 파일로 변환하여 서버에 저장
//           if (getClassType(compareItem[key]) === "Array" &&
//           (key === "files" || key === "file")) { 
//             compareItem[key].forEach((file) => {
//               binaryDataToFile(file.binary, file.serverFileName)
//             });
//           }
//         }
//         (async () => {
//           const result = await req.app.service(compareKey).create(compareItem, {
//             user,
//             query: {},
//             route: {},
//             provider: "rest",
//             headers: req.headers,
//           });
//           console.log(result);
//         })();
//       } else {
//         (async () => {
//           const result = await req.app.service(compareKey).create(compareItem, {
//             user,
//             query: {},
//             route: {},
//             provider: "rest",
//             headers: req.headers,
//           });
//           console.log(result);
//         })();
//       }
//     });
//   }

//   return;
// };
