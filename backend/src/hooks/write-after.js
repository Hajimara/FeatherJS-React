const errors = require("@feathersjs/errors");

module.exports = (option = {}) => {
  return async (context) => {
    if (context.method === "create") {
    }
    // if (context.method === "remove") {
    //   if (context.params.payload.userId !== context.data.author._id) {
    //     throw new errors.NotFound("Unauthorized user");
    //   }
    // }
    return context;
  };
};
