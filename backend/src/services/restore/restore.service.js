const createService = require("./restore.class");
const hooks = require("./restore.hooks");
const restoreModule = require("../../middleware/restore");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const paginate = app.get("paginate");
  
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, "./restore-file"),
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
    paginate,
  };

  app.use(
    "/restore",
    upload.single("file"),
    restoreModule,
    createService(options)
  );

  const service = app.service("restore");

  service.setup(app);

  service.hooks(hooks);
};
