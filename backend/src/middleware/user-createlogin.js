module.exports = async function (req, res, next) {
  if (req.method === "POST") {
    let authors = await res.hook.app.service("user/login").create(
      {
        user: {
          strategy: "local",
          email: req.body.email,
          password: req.body.password,
        },
      },
      {
        query: {},
        route: {},
        provider: "rest",
        headers: req.headers,
      }
    );
    res.data.user.token = authors.token;
  }
  next();
};
