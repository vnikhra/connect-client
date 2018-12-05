import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";

import ApolloClient from "apollo-client";

import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({
  uri: "http://localhost:3000"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
