import Cookies from "universal-cookie";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const restore = app.service("restore");

export const restoreUploadApi = (_id,data) => {
  console.log(_id,data);
  
  return restore.patch(_id,data,{
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
    },
  });
};