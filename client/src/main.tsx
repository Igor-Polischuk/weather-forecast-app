import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import React from "react";

import {client} from "@/apollo/apollo-client";
import App from "@/App.tsx";

import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
