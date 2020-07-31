const FormData = require("form-data");
const bufferToStream= require('./bufferToStream');
module.exports = (user, req, serviceData, jsonParserData) => {
  console.log(user, req, serviceData, jsonParserData);
  for (const serviceKey in serviceData) {
    for (const parserDataKey in jsonParserData) {
      if (serviceKey === parserDataKey) {
        serviceData[serviceKey].map((serviceItem, serviceIndex) => {
          jsonParserData[parserDataKey].map(
            (jsonParserItem, jsonParserIndex) => {
              if (serviceItem._id === jsonParserItem._id) {
                if (serviceKey === "board") {
                  let formData = new FormData();
                  for (const key in jsonParserItem) {
                    if (getClassType(jsonParserItem[key]) === "Object") {
                      for (const objKey in jsonParserItem[key]) {
                        formData.append(objKey, jsonParserItem[key][objKey]);
                      }
                    } else if (
                      getClassType(jsonParserItem[key]) === "Array" &&
                      (key === "files" || key === "file")
                    ) {
                      jsonParserItem[key].forEach((file) => {
                        formData.append("files", file);
                      });
                    } else {
                      formData.append(key, jsonParserItem[key]);
                    }
                  }
                  (async () => {
                    const result = await req.app
                      .service(parserDataKey)
                      .update(jsonParserItem._id, formData, {
                        query: {},
                        route: {},
                        provider: "rest",
                        headers: req.headers,
                      });
                    console.log(result);
                  })();
                } else {
                  (async () => {
                    const result = await req.app
                      .service(parserDataKey)
                      .create(jsonParserItem._id, jsonParserItem, {
                        query: {},
                        route: {},
                        provider: "rest",
                        headers: req.headers,
                      });
                    console.log(result);
                  })();
                }
              } else if (serviceItem._id !== jsonParserItem._id) {
                if (serviceKey === "board") {
                  let formData = new FormData();
                  for (const key in jsonParserItem) {
                    if (getClassType(jsonParserItem[key]) === "Object") {
                      for (const objKey in jsonParserItem[key]) {
                        formData.append(objKey, jsonParserItem[key][objKey]);
                      }
                    } else if (
                      getClassType(jsonParserItem[key]) === "Array" &&
                      (key === "files" || key === "file")
                    ) {
                      jsonParserItem[key].forEach((file) => {
                        formData.append("files", {
                            //bufferto => 리스트로 해야됨 파일 리스트 
                          value: bufferToStream(file.binary.data),
                          options: {
                            filename: file.originalFileName,
                            contentType: file.mime,
                            knownLength: file.size,
                          },
                        });
                      });
                    } else {
                      formData.append(key, jsonParserItem[key]);
                    }
                  }
                  (async () => {
                    const result = await req.app
                      .service(parserDataKey)
                      .update(formData, {
                        query: {},
                        route: {},
                        provider: "rest",
                        headers: req.headers,
                      });
                    console.log(result);
                  })();
                } else {
                  (async () => {
                    const result = await req.app
                      .service(parserDataKey)
                      .create(jsonParserItem, {
                        query: {},
                        route: {},
                        provider: "rest",
                        headers: req.headers,
                      });
                    console.log(result);
                  })();
                }
              }
            }
          );
        });
      }
    }
  }

  return;
};

function getClassType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
