const errors = require("@feathersjs/errors");

module.exports = (option = {}) => {
  return async (context) => {
    if (context.params.user.role[0] !== "super") {
      //   if (context.method === "create") {
      //     if (!context.params.user.role.includes("c")) {
      //     //   throw new errors.NotFound("Unauthorized user");
      //     }
      //   }
      if (context.method === "patch") {
        if (context.params.payload.userId !== context.data.author._id) {
          throw new errors.NotFound("Unauthorized user");
        }
      }
      if (context.method === "remove") {
        if (context.params.payload.userId !== context.data.author._id) {
          throw new errors.NotFound("Unauthorized user");
        }
      }
    }
    return context;
  };
};
