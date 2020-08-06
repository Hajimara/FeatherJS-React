// const feathers = require('@feathersjs/feathers');
// const socketio = require('@feathersjs/socketio-client');
// const io = require('socket.io-client');
// import Cookies from "universal-cookie";
// const cookies = new Cookies();
// const app = feathers();

// const socket = io('http://localhost:3030/',{
//     extraHeaders: {
//       Authorization: "Bearer " + cookies.get("access_token")
//     }
//   });
//   app.configure(socketio(socket));


// socket.emit('get', 'backup', 1, (error, message) => {
//     console.log('Found message', message);
//   });


// app.service('backup').get({
//   text: 'A message from a REST client'
// });
