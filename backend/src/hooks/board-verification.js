const errors = require("@feathersjs/errors");

module.exports = (option = {}) => {
  return async (context) => {
    if(context.method==='get'){
      return context;
    }
    if (context.params.user.role[0] !== "super") {
      if (context.method === "find") {
        if (context.params.query.$limit !== "3") {
          if (!context.params.user.role.includes("r")) {
            throw new errors.NotFound("Unauthorized user");
          }
        }
      }
      if (context.method === "create") {
        if (!context.params.user.role.includes("c")) {
          throw new errors.NotFound("Unauthorized user");
        }
      }
      if (context.method === "update") {
        if (!context.params.user.role.includes("c")) {
          throw new errors.NotFound("Unauthorized user");
        }
      }
      if (context.method === "remove") {
        if (!context.params.user.role.includes("c")) {
          throw new errors.NotFound("Unauthorized user");
        }
      }
    }
    return context;
  };
};
