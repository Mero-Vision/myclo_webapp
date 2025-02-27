import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { store } from "./rootRedux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <BrowserRouter basename="/">
         <App />
      </BrowserRouter>
   </Provider>
);
