const errors = require("@feathersjs/errors");
const unzip = require("../lib/restore/unzip");
const getService = require("../lib/backup/getService");
const path = require("path");
const parserJSONData = require("../lib/restore/parserJSONData");
const dataCompare = require("../lib/restore/dataCompare");
const parseDataCreate = require("../lib/restore/parseDataCreate");

module.exports = async (req, res, next) => {
  if (req.method === "PATCH") {
    let user = await req.app.service("user").get(req.params.__feathersId, {
      headers: req.headers,
    });
    let jsonData;
    // let filePath = path.join(__dirname, "../../../", req.file.destination + "/", req.file.filename);
    let filePath = path.join( __dirname, "../../", req.file.destination + "/", req.file.filename);

    if (req.file.mimetype === "application/zip") {
      jsonData = await unzip(req.file).catch((error) => {
        console.log(error);
      });
      
    } else if (req.file.mimetype === "application/json") {
      jsonData = require(filePath);
    } else {
      throw new errors.BadRequest("File format not supported");
    }

    let serviceData = await getService(req, user);
    let jsonParserData = await parserJSONData(jsonData);
    let compareData = dataCompare(serviceData, jsonParserData);
    let d = parseDataCreate( user,req,compareData)

    return;
  }
  next();
};
