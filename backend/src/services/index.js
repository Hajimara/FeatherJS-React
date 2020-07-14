const user = require("./user/user.service.js");
const users = require("./users/users.service.js");
const board = require("./board/board.service.js");
const comment = require("./comment/comment.service.js");
const upload = require("./upload/upload.service.js");
const notice = require("./notice/notice.service.js");

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(notice);
  app.configure(upload);
  app.configure(comment);
  app.configure(board);
  app.configure(user);
  app.configure(users);
};
