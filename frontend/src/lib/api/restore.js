import Cookies from "universal-cookie";
const cookies = new Cookies();

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const restore = app.service("restore");

export const restoreUploadApi = (data) => {
  return restore.create(data,{
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
    },
  })
};
