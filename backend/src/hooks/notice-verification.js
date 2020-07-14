const errors = require("@feathersjs/errors");

module.exports = (option = {}) => {
  return async (context) => {
    if (context.params.user.role[0] !== "super") {
      throw new errors.NotFound("Unauthorized user");
    }
    return context;
  };
};
