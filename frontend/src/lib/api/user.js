import Cookies from "universal-cookie";
import user from "../../modules/user";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const users = app.service("user");

export const findUserApi = (data) => {
  if(data === 'home'){
    return users.find({
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
      query: {
        $limit: 3,
        $sort: {
          createdAt: -1,
        },
      },
    });
  }
    console.log(data);
    if (data!==undefined){
    console.log(data);
    return users.find({
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
      query: {
        // $limit: 6,
        // $skip: 6 * (data - 1),
        $sort: {
          createdAt: -1,
        },
        username: {
          $search: data.search
        }
      },
    });
  }else{
    return users.find({
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
      query: {
        // $limit: 6,
        // $skip: 6 * (data - 1),
        $sort: {
          createdAt: -1,
        },
      },
    });
  }

  
};

export const findOneApi = (data) => {
  return users.find({
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
    query: {
      email: data,
    },
  });
};


export const removeUserApi = (data) => {
  return users.remove(data,{
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
  });
};

export const userRoleUpdateApi = (data) => {
  const im = data.data.image ? data.data.image : null;
  
  return users.patch(
    // data._id,
    // {
    //   email: data.data.email,
    //   username: data.data.username,
    //   password: data.data.password,
    //   role: data.permissionList,
    //   image: im,
    // },
    data._id,
    {
      role: data.permissionList,
    },
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const patchUserApi = (id,data) => {
  // const im = data.data.image ? data.data.image : null;
  return users.patch(
    id,
    data,
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        // "Content-Type": "application/json",
      },
    }
  );
};

export const userPasswordChangeApi = (data) => {
  return users.patch(
    data._id,
    data,
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",

      },
    }
  );
};

