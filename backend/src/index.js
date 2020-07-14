const app = require('./app');
const express = require('@feathersjs/express');

const mainApp = express().use('/', app);
const server = mainApp.listen(3030, ()=>{
    console.log('running on http://localhost:3030');
});
app.setup(server);

process.setMaxListeners(15);