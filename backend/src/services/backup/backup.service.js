const createService = require("./backup.class");
const hooks = require("./backup.hooks");

module.exports = (app) => {
  const paginate = app.get("paginate");

  const options = {
    paginate,
  };

  app.use("/backup", createService(options));
  
  const service = app.service("backup");
  service.setup(app);

  service.hooks(hooks);
};
