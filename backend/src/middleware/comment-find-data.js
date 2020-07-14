module.exports = async function (req, res, next) {
    if (req.method === "GET") {
        let authors = await res.hook.app.service("user").find(
            {
              
            },
            {
              query: {},
              route: {},
              provider: "rest",
              headers: req.headers,
            }
          );

          let board = await res.hook.app.service("board").find(
            {
               
            },
            {
              query: {},
              route: {},
              provider: "rest",
              headers: req.headers,
            }
          );

          let parentComment = await res.hook.app.service("comment").find(
            {
             
            },
            {
              query: {},
              route: {},
              provider: "rest",
              headers: req.headers,
            }
          );
    //   res.data.user.token = authors.token;
    // console.log(authors);
    // console.log(board);
    // console.log(parentComment);
    
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