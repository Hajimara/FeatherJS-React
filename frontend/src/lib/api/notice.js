import Cookies from "universal-cookie";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const notice = app.service("notice");

export const noticeWriteApi = (data) => {
  return notice.create(data,{
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
  });
};

export const noticeFindAllApi = (data) => {
    return notice.find({
        headers: {
            Authorization: "Bearer " + cookies.get("access_token"),
            "Content-Type": "application/json",
          },
          query: {
              $sort: {
                  createdAt : -1
              }
          }
    })
}

export const noticeFindOneApi = (data) => {
  return notice.get(data,{
      headers: {
          Authorization: "Bearer " + cookies.get("access_token"),
          "Content-Type": "application/json",
        },
  })
}

export const noticePatchApi = (data) => {
  return notice.patch(
    data._id,
    { text: data.text },
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
}

export const noticeRemoveApi = (data) => {
  return notice.remove(
    data,
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
}