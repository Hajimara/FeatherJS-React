import Cookies from "universal-cookie";

const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

const app = feathers();
const cookies = new Cookies();

const restClient = rest("http://localhost:3030");

app.configure(restClient.axios(axios));

const board = app.service("board");

export const boardFindAllApi = (data = 1) => {
  if (data === "home") {
    return board.find({
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

  if(data.sort === ''){
    data.sort = 'createdAt';
    data.sortType = -1;
  }else if (String(data.sort).includes('최신순')){
    data.sort = 'createdAt';
    data.sortType = -1;
    
  }else if(String(data.sort).includes('조회수')){
    data.sort = 'views';
    data.sortType = -1;
  }

  if (data.search === "") {
    
    return board.find({
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
      query: {
        // $limit: 8,
        // $skip: 8 * (data.page - 1),
        $sort: {
          [data.sort]: data.sortType,
        },
      },
    });
  } else {
    if(data.searchType === 'title' ||data.searchType === 'body'||data.searchType === 'category'){
      return board.find({
        headers: {
          Authorization: "Bearer " + cookies.get("access_token"),
          "Content-Type": "application/json",
        },
        query: {
          // $limit: 8,
          // $skip: 8 * (data.page - 1),
          $sort: {
            [data.sort]: data.sortType,
          },
          [data.searchType]: {
            $search: data.search,
          },
        },
      });
    }else{
      return board.find({
        headers: {
          Authorization: "Bearer " + cookies.get("access_token"),
          "Content-Type": "application/json",
        },
        query: {
          // $limit: 8,
          // $skip: 8 * (data.page - 1),
          $sort: {
            [data.sort]: data.sortType,
          },
          "author.username": 
            data.search,
          
        },
      });
    }
  }
  
};

export const writeApi = (data,dataId) => {
  if(dataId){
    return board.update(dataId, data, {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        // "Content-Type": "application/json",
      },
    });
  }else{
    return board.create(data, {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        // 'Content-Type': 'multipart/form-data',
      },
    });
  }
  
};

export const viewCounterApi = (data) => {
  
    return board.patch(data.id,{
      views: data.views
    }, {
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
        "Content-Type": "application/json",
      },
    });
};


export const boardFindOneApi = (data) => {
  return board.get(data, {
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
  });
}

export const boardRemoveApi = (data) => {
  return board.remove(data, {
    headers: {
      Authorization: "Bearer " + cookies.get("access_token"),
      "Content-Type": "application/json",
    },
  });
}

export const fileLoadApi = (data) => {
    return board.get(data,{
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
      },
      query: {
        serverFileName: data
      },
    });
  }
