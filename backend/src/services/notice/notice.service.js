const createService = require("feathers-mongoose");
const createModel = require("../../models/notice.model");
const hooks = require("./notice.hooks");

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    lean: true,
    paginate,
  };

  app.use("/notice", createService(options));

  const service = app.service("notice");

  service.hooks(hooks);
};
