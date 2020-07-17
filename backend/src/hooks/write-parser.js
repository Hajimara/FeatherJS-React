const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
module.exports = (option = {}) => {
  return async (context) => {
    if (
      context.method === "get" ||
      !Object.prototype.hasOwnProperty.call(context.data, "views")
    ) {
      if (context.method === "create" || context.method === "update") {
        const author = {
          _id: context.data.user_id,
          email: context.data.email,
          username: context.data.username,
          image: context.data.image,
        };
        context.data.author = author;
        if (context.data.file.length === 0) {
          delete context.data.file;
        }
        if (context.method === "update") {
          if (context.data.fileArray !== "[]") {
            const fileArray = JSON.parse(context.data.fileArray);

            if (context.data.deleteFileId !== "[]") {
              const deleteFileId = JSON.parse(context.data.deleteFileId);

              for (let i = 0; i < deleteFileId.length; i++) {
                const deleteItem = deleteFileId[i];
                for (let j = 0; j < fileArray.length; j++) {
                  const fileItem = fileArray[j];
                  if (JSON.stringify(fileItem).includes(String(deleteItem))) {
                    fileArray[j].isDeleted = true;
                    let filePath = path.join(
                      __dirname,
                      "/../..",
                      "/upload",
                      fileArray[j].serverFileName
                    );
                    fs.unlink(filePath, function (err) {
                      if (err) throw new errors.NotFound("File not found.");
                      console.log("file deleted");
                    });
                  }
                }
              }
            }

            if (context.data.file !== undefined) {
              let js = fileArray.concat(context.data.file);
              context.data.file = js;
            } else {
              let js = fileArray;
              context.data.file = js;
            }

          }
        }

        delete context.data._id;
        delete context.data.email;
        delete context.data.username;
        delete context.data.image;
        delete context.data.attachment;
      }
      if (context.method === "remove") {
        let boardInfo = await context.app.service("board").get(context.id, {
          headers: {
            Authorization: context.params.headers.authorization,
            "Content-Type": "application/json",
          },
        });
        if (boardInfo.hasOwnProperty("file") && boardInfo.file.length > 0) {
          for (let index = 0; index < boardInfo.file.length; index++) {
            const element = boardInfo.file[index];
            if (element.isDeleted === false) {
              let filePath = path.join(
                __dirname,
                "/../..",
                "/upload",
                boardInfo.file[index].serverFileName
              );
              try {
                fs.unlink(filePath, function (err) {
                  if (err) {
                  console.log("File not found");
                  }
                  console.log("file deleted");
                });
              } catch (error) {
                throw new errors.NotFound("File not found.");
              }
              // fs.unlink(filePath, function (err) {
              //   if (err) {
              //   }
              //   console.log("file deleted");
              // });
            }
          }
        }
      }
    }

    return context;
  };
};

// if (context.method === "remove") {
//   if (context.params.payload.userId !== context.data.author._id) {
//     throw new errors.NotFound("Unauthorized user");
//   }
// }
// let user = await context.app.service('user').find({
//     header: {
//         Authorization:  context.params.headers.authorization
//     },
//     query: {
//         email: context.params.user.email
//     }
// });
// console.log(user.data[0]);

// let deleteTarget = await context.app.service('board').get(user.data[0]._id,{
//     header: {
//         Authorization:  context.params.headers.authorization
//     },
//     query: {
//         file : {
//             _id : "5f02b934c81bb757b2a36edb"
//         }
//     },
//     // user: user.data[0]

// });
