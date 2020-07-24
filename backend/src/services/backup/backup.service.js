const createService = require("./backup.class");
const hooks = require("./backup.hooks");
const backupModule = require('../../middleware/backup');

module.exports = (app) => {
  const paginate = app.get("paginate");

  const options = {
    paginate,
  };

  app.use("/backup", backupModule,createService(options));
  
  const service = app.service("backup");
  
  service.setup(app);

  service.hooks(hooks);
};
