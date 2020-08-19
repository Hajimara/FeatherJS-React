const { authenticate } = require("@feathersjs/authentication").hooks;
const backup = require('../../hooks/backup-file');
module.exports = {
  before: {
    all: [],
    // all: [authenticate("jwt"),],
    find: [],
    get: [],
    create: [authenticate("jwt")],
    update: [],
    patch: [],
    remove: [authenticate("jwt")],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
