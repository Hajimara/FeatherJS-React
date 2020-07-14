
module.exports = function (options = {}) {
  return async context => {
    if (context.data) {
      let user = context.data.user;
      if (user) {
        user.image = user.image ? user.image : null;
        context.data = context.data.user;
      }
    }
    return context;
  };
};
