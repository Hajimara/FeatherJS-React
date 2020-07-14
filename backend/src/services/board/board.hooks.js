const { authenticate } = require("@feathersjs/authentication").hooks;
const boardVerification = require('../../hooks/board-verification');
const writeParser= require('../../hooks/write-parser');
const writeAfter= require('../../hooks/write-after');
const dauria = require("dauria");
const search = require('feathers-mongodb-fuzzy-search');

module.exports = {
  before: {
    all: [authenticate("jwt"),boardVerification(),writeParser()],
    find: [search({  // regex search on given fields
      fields: ['title','body','category']
    })],
    get: [],
    create: [function(hook) {
        if (!hook.data.uri && hook.params.file){
            const file = hook.params.file;
            const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
            hook.data = {uri: uri};
        }
    }],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [writeAfter()],
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
