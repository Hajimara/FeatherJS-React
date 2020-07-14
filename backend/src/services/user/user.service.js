const createService = require("feathers-mongoose");
const createModel = require("../../models/user.model");
const hooks = require("./user.hooks");
const createLogin = require("../../middleware/user-createlogin");
const multer = require("multer");
const path = require('path');
const fs = require('fs')

module.exports = function (app) {
  // 참고자료 https://www.npmjs.com/package/feathers-mongoose
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, "./upload-image"),
    filename: (_req, file, cb) =>
      cb(null, `${Date.now()}-${file.originalname}`),
  });
  const upload = multer({
    storage,
    limits: {
      fieldSize: 10000000000,
      fileSize: 10000000000,
    },
  });
  const options = {
    Model,
    lean: true,
    paginate,
  };

  app.use(
    "/user",
    upload.single("files"),
    (req, _res, next) => {
      const { method } = req;
      if (!String(req.headers.referer).includes("setting")) {
        if (req.file !== undefined) {
          if (method === "PATCH") {
            req.feathers.file = req.file;
            req.body.image = req.file.filename;
          }
        }
        if (method === "GET") {
          if (req.query.image) {
            // console.log(req);
            let stream;
            let filePath = path.join(
              __dirname,
              "/../../..",
              "/upload-image",
              req.query.image
            );
            // console.log(filePath);
            var fileExists = fs.existsSync(filePath);
            if (fileExists) {
              stream = fs.createReadStream(filePath);
            } else {
              // this.processDelete();
            }
            if (stream) {
              // console.log(req);
              if (String(req.query.image).includes("png")) {
                _res.writeHead(200, {
                  "Content-Type": "image/png",
                  "Content-Disposition": "attachment; filename=",
                });
              } else if (
                String(req.query.image).includes("jpeg") ||
                String(req.query.image).includes("jpg")
              ) {
                _res.writeHead(200, {
                  "Content-Type": "image/jpeg",
                  "Content-Disposition": "attachment; filename=",
                });
              } else {
                _res.statusCode = 404;
              _res.end();
              return;
            }
              stream.pipe(_res);
              return;
            } else {
              _res.statusCode = 404;
              _res.end();
              return;
            }
          }
        }
      }
      next();
    },
    createService(options),
    createLogin
  );

  const service = app.service("user");

  service.hooks(hooks);
};

// const createService = require('feathers-mongoose');
// const createModel = require('../../models/user.model');
// const hooks = require('./user.hooks');
// const createLogin = require('../../middleware/user-createlogin');

// module.exports = function(app) {
//     // 참고자료 https://www.npmjs.com/package/feathers-mongoose
//     const Model = createModel(app);
//     const paginate = app.get('paginate');
//     const options = {
//         Model,
//         lean: true,
//         paginate
//     };
//     app.use('/user',createService(options),createLogin);

//     const service = app.service('user');

//     service.hooks(hooks)
// }
