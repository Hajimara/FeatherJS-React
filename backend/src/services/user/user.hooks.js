const { authenticate } = require("@feathersjs/authentication").hooks;
const permissionVerification = require("../../hooks/permission-verification");
const {
  hashPassword,
  protect,
} = require("@feathersjs/authentication-local").hooks;
const search = require('feathers-mongodb-fuzzy-search');

const processUser = require("../../hooks/process-user");
const userResponse = require("../../hooks/user-response");
const profileFile = require('../../hooks/profile-file');
module.exports = {
  before: {
    all: [processUser()],
    find: [authenticate("jwt"),search({  // regex search on given fields
      fields: ['username']
    })],
    get: [authenticate("jwt")],
    create: [hashPassword()],
    update: [hashPassword(), authenticate("jwt"), permissionVerification()],
    patch: [authenticate("jwt"),hashPassword(), permissionVerification(),profileFile()],
    remove: [authenticate("jwt"),permissionVerification()],
  },
  after: {
    all: [],
    find: [],
    get: [protect("password")],
    create: [userResponse(), protect("password")],
    update: [protect("password")],
    patch: [protect("password")],
    remove: [protect("password")],
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
