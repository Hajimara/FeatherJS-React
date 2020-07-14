const createService = require("./users.class");
const hooks = require("./users.hooks");

module.exports = (app) => {
  const paginate = app.get("paginate");

  const options = {
    paginate,
  };

  app.use("/users", createService(options));
  
  const service = app.service("users");
  service.setup(app);

  service.hooks(hooks);
};
