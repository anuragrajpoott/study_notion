import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

import App from "./App";
import rootReducer from "./reducer";
import "./index.css";

const store = configureStore({
  reducer: rootReducer,
});

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);