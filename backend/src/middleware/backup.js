const fs = require("fs");
const jsonfile = require("jsonfile");
const zip = new require('node-zip')();

module.exports = async function (req, res, next) {
  if (req.method === "GET") {
  }
  next();
};

//   let parentComment = await res.hook.app.service("comment").find(
//     {
//       user: {
//         strategy: "local",
//         email: req.body.email,
//         password: req.body.password,
//       },
//     },
//     {
//       query: {},
//       route: {},
//       provider: "rest",
//       headers: req.headers,
//     }
//   );
