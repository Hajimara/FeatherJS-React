import Cookies from "universal-cookie";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const backup = app.service("backup");

export const backupDownloadApi = (data) => {
  return backup.get(data._id,{
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      // "Accept-Encoding": "gzip, deflate, br",
      // Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      // Cookie :  'access_token=' + cookies.get("access_token"),
    },
    user:{
      data
    },
  });
};
