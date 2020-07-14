const createService = require("feathers-mongoose");
const createModel = require("../../models/comment.model");
const hooks = require("./comment.hooks");

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    lean: true,
    paginate,
  };

  app.use("/comment", createService(options));

  const service = app.service("comment");

  service.hooks(hooks);
};
