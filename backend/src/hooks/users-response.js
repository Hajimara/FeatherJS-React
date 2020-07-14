module.exports = (option = {}) => {
  return async (context) => {
    if (context.data) {
      if (context.method == "get") {
        if (context.path === "users") {
          let result = {};
          result.users = context.result;
          // result.users.token = context.params.headers.authorization;
          result.users.role = result.users.role;
          result.users._id = context.params.payload.userId;
          result.users.image = result.users.image ? result.users.image : null;
          context.result = result;
        }
      }
    }
  };
};
