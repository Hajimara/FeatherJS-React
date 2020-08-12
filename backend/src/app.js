const cors = require("cors");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const mongoose = require("mongoose");
const socketio = require('@feathersjs/socketio');



mongoose
  .connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const services = require("./services");
const authentication = require("./authentication");
const channels = require("./channels");
const appHooks = require("./app.hooks");
const middleware = require("./middleware")

const app = express(feathers());
app.use(cors());
app.configure(configuration());

app.use(express.urlencoded({ extended: true,limit : "50mb" ,parameterLimit: 1000000}));
app.use(express.json({limit : "50mb"}));
app.use(express.errorHandler());

// app.use((req,res,next) => {
//   // if(req.query.hasOwnProperty('serverFileName')){
//   //   res.writeHead(200, {
//   //             // 'Content-Type': 'application/octet-stream',
//   //             'Content-Type': 'image/png',
//   //             'Content-Disposition': 'attachment; filename=' 
//   //           });
//   // }
//   // console.log(req);
//   // console.log(res);
//   next();
  
// })

app.configure(express.rest());
app.configure(socketio());
app.configure(authentication);
app.configure(services);
app.configure(channels);
app.configure(middleware)

app.use(express.notFound());

app.hooks(appHooks);

module.exports = app;
