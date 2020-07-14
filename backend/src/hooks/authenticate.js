module.exports = function (options = {}) {
  return async (context) => {
    if (context.data) {
      let user2 = context.data.user;
      if (user2) {
        var strategy = user2.strategy;
        if (!strategy) {
          user2.strategy = "local";
        }
        context.data = user2;
      }
    }
    return context;
  };
};
