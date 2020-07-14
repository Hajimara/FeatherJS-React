const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const user = app.service("user/login");

export const userLogin = (data) => {
  console.log(data);
  
  return user.create(data);
};
