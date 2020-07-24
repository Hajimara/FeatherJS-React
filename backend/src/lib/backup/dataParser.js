const { ObjectID } = require("mongodb");
const path = require('path');
const fs = require('fs');

/**
 * key를 사용하여 file or files key가 있는지 검사 후 파일을 처리.
 * rootKey를 제외한 다른 컬렉션은 조인 처리와 파일 처리.
 * 
 * @param {object} dataStructure DB의 컬렉션에 대한 연관구조
 * @param {[string]} id 사용자가 선택한 rootKey의 id 배열타입의 스트링
 * @returns {object} jsonDocument 서비스에서 불러온 데이터를 하나로 묶은 josn형식의 데이터
 */

module.exports = async (dataStructure, id) => {
  let rootKey;
  let jsonDocument;
  let filePath;
  for (let item in dataStructure) {
    // rootKey를 지정하기 위해 항상 객체 맨 위에 root document를 지정하여 파라미터로 전달해야함
    if (!rootKey) {
      rootKey = item;
    }
    let documentObj = dataStructure[item];
    fileRecursion(documentObj, documentObj.length);
    if (rootKey !== item) {
      // 조인처리 완료된 데이터 삭제
      delete dataStructure[item];
    }
    jsonDocument = dataStructure;

    function fileRecursion(dataObj, n) {
      if (n === 0 ) {
        return 1;
      }
      let objResult;
      objResult = documentObj[n - 1];
      console.log(objResult);
      for (objItem in objResult) {
        obj = objResult[objItem];
        if (getClassType(obj) === "Array") {
          if (objItem === "file" || objItem === "files") {
            if (
              JSON.stringify(obj).includes("[]") ||
              JSON.stringify(obj).includes("null") ||
              JSON.stringify(obj).includes("undefined")
            ) {
            } else {
              obj.map((fileData,index) => {
                filePath = path.join(
                  __dirname,
                  "/../../..",
                  "/upload",
                  fileData.serverFileName
                );
                // 파일
                const binaryString = fs.readFileSync(filePath);
                console.log(dataStructure[item][n-1][objItem][index]);
                dataStructure[item][n-1][objItem][index].binary = binaryString;
              });
            }
          }
        }
      }
      if (rootKey !== item) {
        dataStructure[rootKey].forEach((rootItem) => {
          dataStructure[item].forEach((docItem) => {
            if (
              new ObjectID(rootItem._id).equals(
                new ObjectID(docItem[rootKey]._id)
              )
            ) {
              rootItem[item] = docItem;
              console.log(rootItem);
            }
          });
        });
      }
      return n * fileRecursion(documentObj, n - 1);
    }
  }
  console.log(jsonDocument);
  return jsonDocument;
};

function getClassType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
// module.exports = async (data) => {
//   let board = data.board.data; // rootKey 선별
//   let comment = data.comment.data;

//   board.forEach((boardItem) => {
//     comment.forEach((commentItem) => {
//       if (
//         new ObjectID(boardItem._id).equals(new ObjectID(commentItem.board._id))
//       ) {
//         boardItem.comment = commentItem;
//       }
//     });
//   });

//   return board;
// };
