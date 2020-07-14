const errors = require("@feathersjs/errors");
const {
  hashPassword,
} = require("@feathersjs/authentication-local").hooks;
module.exports = (option = {}) => {
  return async (context) => {
    if (context.params.headers.referer.includes("myProfile")) {
      if (context.params.payload.userId !== context.id) {
        throw new errors.NotFound("Unauthorized user");
      } else {
        if(context.data.division === 'profile'){
          let authors = await context.app.service("user/login").create(
            {
              user: {
                strategy: "local",
                email: context.params.user.email,
                password: context.data.currentPassword,
              },
            },
            {
              query: {},
              route: {},
              provider: "rest",
              headers: context.params.headers,
            }
          );
          if (authors) {
            delete context.data.currentPassword;
            delete context.data.division;
          } else {
            throw new errors.NotFound("Mismatched password");
          }
        }else if (context.data.division === 'password'){
          let authors = await context.app.service("user/login").create(
            {
              user: {
                strategy: "local",
                email: context.params.user.email,
                password: context.data.currentPassword,
              },
            },
            {
              query: {},
              route: {},
              provider: "rest",
              headers: context.params.headers,
            }
          );
          if (authors) {
            // context.data.password = password;
            delete  context.data.confirmPassword
            delete  context.data.currentPassword
            //패스워드 넣어주고 기존 패스워드 삭제 cur new con
            delete context.data.division;
          } else {
            throw new errors.NotFound("Mismatched password");
          }
        }
        
      }
    } else {
      if (!context.params.user.role.includes("super")) {
        throw new errors.NotFound("Unauthorized user");
      }
    }

    return context;
  };
};
