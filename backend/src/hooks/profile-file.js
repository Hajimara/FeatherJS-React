
module.exports = function (options = {}) {
    return async context => {
        if(String(context.params.headers.referer).includes('myProfile')){
            // console.log(context.params.user);
        }
      return context;
    };
  };