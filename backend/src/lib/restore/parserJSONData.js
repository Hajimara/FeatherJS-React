module.exports = async (jsonData) => {
  let dataStructure = {};
  let docArray = [];
  let rootKey = Object.keys(jsonData);
  jsonData[rootKey].map((item, index) => {
    console.log(item);
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
          delete item[key];
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
