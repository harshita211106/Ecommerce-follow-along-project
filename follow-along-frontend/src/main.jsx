

import React from "react";
import ReactDOM from "react-dom/client";  // Import from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Create the root element

root.render(  // Use root.render() instead of ReactDOM.render()
  <Provider store={store}>
    <App />
  </Provider>
);
