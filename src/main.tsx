import { App } from "@/App";
import "@/assets/styles/index.css";
import "@/config/basicConfig";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
