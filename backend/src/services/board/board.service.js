const createService = require("feathers-mongoose");
const createModel = require("../../models/board.model");
const hooks = require("./board.hooks");
var fs = require("fs");
var path = require("path");
const multer = require("multer");

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, "./upload"),
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
    "/board",
    // authenticate('jwt'),
    upload.array("files"),
    (req, _res, next) => {
      const { method } = req;

      if (method === "POST" || method === "PUT") {
        if('views' in req.body){
          next();
        }
        req.feathers.files = req.files;
        const body = [];


        if (req.files === undefined) {
          return;
        }
        for (const file of req.files)
          body.push({
            // description: req.body.description,
            originalFileName: file.originalname,
            serverFileName: file.filename,
            size: file.size,
            // userId: req.user.id
          });
        req.body.file = body ;
      }
      if (method === "GET") {
        if(req.query.serverFileName){
          // console.log(req);
          let stream;
          let filePath = path.join(
            __dirname,
            "/../../..",
            "/upload",
            req.query.serverFileName
          );
          // console.log(filePath);
          var fileExists = fs.existsSync(filePath);
          if (fileExists) {
            stream = fs.createReadStream(filePath);
          } else {
            // this.processDelete();
          }
          // console.log(stream);
          if(stream){
            console.log(req);
            if(String(req.query.serverFileName).includes('png')){
              _res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename=' 
              });
            }else if(String(req.query.serverFileName).includes('jpg') || String(req.query.serverFileName).includes('jpg')){
              _res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'attachment; filename=' 
              });
            }else{
              _res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=' 
              });
            }

            
            // _res.contentType('image/png')
            // _res.end();
            stream.pipe(_res);
            return;
          }else { 
            _res.statusCode = 404;
            _res.end();
          }
        }
        
      }
      next();
    },
    createService(options)
  );

  const service = app.service("board");

  service.hooks(hooks);
};
