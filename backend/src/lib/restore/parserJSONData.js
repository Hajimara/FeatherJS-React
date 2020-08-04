
/**
 * rootKey 지정
 * 파일에서 읽어온 데이터를 분리하는 함수이다.
 * 
 */
module.exports = async (jsonData) => {
  let dataStructure = {};
  let docArray = [];
  let rootKey = Object.keys(jsonData);
  console.log(jsonData[rootKey]); // 에러처리하기
  
  jsonData['board'].map((item, index) => {
    for (var key in item) {
      if (getClassType(item[key]) === "Array") {
        if (item[key].length > 1) {
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
    dataStructure[key] = docArray;
    jsonData[key] = dataStructure[key];
  });
  return jsonData;
};

function getClassType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
