const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const authenticate = require('./hooks/authenticate');
const authenticateResponse = require('./hooks/authenticate-response');

module.exports = function (app) {
  const config = app.get('authentication');

  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  app.service('user/login');
  
  app.service('user/login').hooks({
    before: {
      create: [
        authenticate(),
        authentication.hooks.authenticate(config.strategies),
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        authenticateResponse()
      ]
    }
  });

};
