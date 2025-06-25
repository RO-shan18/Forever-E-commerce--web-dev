import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppStore from "./redux/appStore.jsx";
import {Provider} from "react-redux"

createRoot(document.getElementById("root")).render(

<Provider store={AppStore}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</Provider>

);
