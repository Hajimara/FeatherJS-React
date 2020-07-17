import Cookies from "universal-cookie";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const comment = app.service("comment");

export const writeCommentApi = (data) => {
  return comment.create(
    {
      board: data.boardId,
      author: {
        _id: data.author._id,
        username: data.author.username,
        email: data.author.email,
        image: data.author.image,
      },
      parentComment: data.parentCommentId,
      text: data.text,
    },
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const findAllCommentApi = (data) => {
  if(data ==='backup'){
    return comment.find({
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
      query: {
        $sort: {
          createdAt: -1,
        },
      },
    });
  }
  let page = null;
  if (data.page > 1) {
    page = data.page;
  } else {
    page = 1;
  }
  return comment.find({
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
    query: {
      $limit: 5,
      $skip: 5 * (page - 1),
      $sort: {
        createdAt: -1,
      },
      board: {
        $in: data.boardId,
      },
      parentComment: {
        hasComment: "no",
      },
    },
  });
};

export const findOneCommentApi = (data) => {
  return comment.get(data._id, {
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
  });
};

export const patchCommentApi = (data) => {
  return comment.patch(
    data._id,
    {
      author: {
        _id: data.author._id,
        username: data.author.username,
        email: data.author.email,
        image: data.author.image
      },
      text: data.text,
      updatedAt: new Date(),
    },
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const removeCommentApi = (data) => {
  return comment.patch(
    data.patchId,
    {
      author: {
        _id: data.author._id,
        email: data.author.email,
        username: data.author.username,
        image: data.author.image
      },
      isDeleted: true,
    },
    {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const childfindAllCommentApi = (data) => {
  
 

  let page = null;
  if (data.page > 1) {
    page = data.page;
  } else {
    page = 1;
  }
    return comment.find({
      query: {
        parentComment: {
          _id: data.parentCommentId,
          hasComment: true,
        },
      },
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    });
  };


export const childWriteCommentApi = (data) => {
    return comment.create(
        {
          board: data.boardId,
          author: {
            _id: data.author._id,
            username: data.author.username,
            email: data.author.email,
          },
          parentComment: {_id : data.parentCommentId, hasComment: "yes"},
          text: data.text,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.get("access_token"),
            "Content-Type": "application/json",
          },
        }
      );
    };
