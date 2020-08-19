const getClassType = require('../common/getClassType');

/**
 * rootKey 지정
 * 파일에서 읽어온 데이터를 분리하는 함수이다.
 * 수정
 */
module.exports = async (jsonData) => {
  let dataStructure = {};
  let docArray = [];
  let rootKey = "board"
  // console.log(jsonData[rootKey]); // 에러처리하기
  
  jsonData[rootKey].map((item, index) => {
    for (var key in item) {
      if (getClassType(item[key]) === "Array") {
        if (item[key].length > 1) {// 파일 조건도 처리
          item[key].map((objItem, objIndex) => {
            if (objItem.hasOwnProperty(rootKey)) {
              docArray.push(objItem);
              delete item[key];
            }
          });
        } else {
        }
      }
    }
    console.log(getClassType(item[key]));
    if(docArray.length > 0){
      // dataStructure[key] = docArray;
      // jsonData[key] = dataStructure[key];
      jsonData[key] = docArray;
    }
    
  });
  return jsonData;
};
