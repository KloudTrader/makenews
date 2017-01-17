/* eslint react/jsx-wrap-multilines:0*/
import { renderRoutes } from "./Routers";
import { Provider } from "react-redux";
import contentDiscoveryApp from "./Reducers";
import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Router } from "react-router";
import History from "./History";
import R from "ramda"; //eslint-disable-line id-length

const store = createStore(contentDiscoveryApp,
    R.compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : func => func)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={History.getHistory()}>{renderRoutes()}</Router>
  </Provider>,
  document.getElementById("main")
);
