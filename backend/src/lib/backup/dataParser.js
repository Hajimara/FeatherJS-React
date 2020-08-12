const { ObjectID } = require("mongodb");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const getClassType = require('../common/getClassType');

/**
 * key를 사용하여 file or files key가 있는지 검사 후 파일을 처리.
 * rootKey를 제외한 다른 컬렉션은 조인 처리와 파일 처리.
 * 수정
 *
 * @param {object} dataStructure DB의 컬렉션에 대한 연관구조
 * @param {[string]} id 사용자가 선택한 rootKey의 id 배열타입의 스트링
 * @returns {object} jsonDocument 서비스에서 불러온 데이터를 하나로 묶은 josn형식의 데이터
 */

module.exports = async (dataStructure, res) => {
  let rootKey;
  let jsonDocument;
  let filePath;
  let uploadFileData = [];
  try {
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
        if (n === 0) {
          return 1;
        }
        let objResult;
        objResult = documentObj[n - 1];
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
                obj.map((fileData, index) => {
                  // filePath = path.join(
                  //   __dirname,
                  //   "/../../..",
                  //   "/upload",
                  //   fileData.serverFileName
                  // );
                  filePath = path.join(
                      __dirname,
                      "/../../..",
                      "/upload",)
                  uploadFileData.push({
                    filePath,
                    filename: fileData.serverFileName,
                  });
                  // 파일
                  // let binaryString = fs.readFileSync(filePath);
                  // let mimetype = mime.getType(filePath);
                  // // console.log(dataStructure[item][n-1][objItem][index]);
                  // dataStructure[item][n - 1][objItem][
                  //   index
                  // ].binary = binaryString;
                  // dataStructure[item][n - 1][objItem][index].mime = mimetype;
                });
              }
            }
          }
        }
        if (rootKey !== item) {
          dataStructure[rootKey].forEach((rootItem) => {
            let arrayDoc = [];
            dataStructure[item].forEach((docItem) => {
              if (
                new ObjectID(rootItem._id).equals(
                  new ObjectID(docItem[rootKey]._id)
                )
              ) {
                arrayDoc.push(docItem);
              }
            });
            rootItem[item] = arrayDoc;
          });
        }
        return n * fileRecursion(documentObj, n - 1);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return { jsonDocument, rootKey, uploadFileData };
};
