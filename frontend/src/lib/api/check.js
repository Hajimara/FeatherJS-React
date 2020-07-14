import Cookies from "universal-cookie";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const users = app.service("users");

export const checkStateApi = () => {
  return users.get(
    { token: cookies.get("access_token") },
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
};
