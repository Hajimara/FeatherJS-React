const { authenticate } = require("@feathersjs/authentication").hooks;
const commentVerification = require('../../hooks/comment-verification');
module.exports = {
  before: {
    all: [authenticate("jwt"), commentVerification()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
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
