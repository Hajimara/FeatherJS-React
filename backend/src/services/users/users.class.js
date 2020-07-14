class Service {
    constructor(options) {
      this.options = options || {};
    }
  
    setup(app) {
      this.app = app;
    }
  
    async get(id, params) {
      let result = {};
      result.email = params.user.email;
      result.username = params.user.username;
      result.image = params.user.image;
      result.role = params.user.role;
      return result;
    }
  }
  
  module.exports = (options) => {
      return new Service(options);
  }
  
  module.exports.Service = Service;