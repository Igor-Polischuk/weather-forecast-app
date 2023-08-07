import ReactDOM from "react-dom/client";
import React from "react";

import App from "@/App.tsx";

import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
