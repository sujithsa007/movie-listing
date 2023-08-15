/*
The main 'App' is wrapped with the "Provider" component from react-redux, which will inject the state changes
from the store into components, once dispatches are triggered. The created store object from store.js is passed as
an argument to Provider component. ReactDOM.createRoot used since its advised for React 18+
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import movieStore from "./redux/store";

const root = document.getElementById("root");
const rootRender = root ? ReactDOM.createRoot(root) : null;

if (rootRender) {
  rootRender.render(
    <Provider store={movieStore}>
      <App />
    </Provider>
  );
}
