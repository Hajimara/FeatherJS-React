const { authenticate } = require("@feathersjs/authentication").hooks;
const  noticeVerification= require('../../hooks/notice-verification')
module.exports = {
  before: {
    all: [authenticate("jwt"), noticeVerification()],
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
