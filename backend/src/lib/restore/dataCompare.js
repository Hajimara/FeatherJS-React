const { ObjectID } = require("mongodb");
/**
 * DB에 존재하는 데이터는 skip 하도록 하고 (기존 jsonParserData 변수에서 빼버린다.)
 * DB에 존재하지 않는 데이터는 그대로 두어
 * 데이터를 선별하는 함수이다.
 */
module.exports = (serviceData, jsonParserData) => {
  for (const serviceKey in serviceData) {
    for (const parserDataKey in jsonParserData) {
      if (serviceKey === parserDataKey) {
        serviceData[serviceKey].map((serviceItem) => {
          jsonParserData[parserDataKey].map(
            (jsonParserItem, jsonParserIndex) => {
              if (
                new ObjectID(serviceItem._id).equals(
                  new ObjectID(jsonParserItem._id)
                )
              ) {
                jsonParserData[parserDataKey].splice(jsonParserIndex,1);
              } else {
              }
            }
          );
        });
      }
    }
  }
  return jsonParserData;
};