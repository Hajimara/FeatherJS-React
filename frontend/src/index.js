import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./modules/index";
import Cookies from "universal-cookie";
import { checkThunk } from "./modules/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function userLoader() {
  try {
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    if (!token) return;
    store.dispatch(checkThunk());
  } catch (error) {
    console.log("cookies is not working");
  }
}
userLoader();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
