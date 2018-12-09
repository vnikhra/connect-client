import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";

import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refreshToken")
    }
  };
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    if (headers) {
      const token = headers.get("x-token");
      if (token) {
        localStorage.setItem("token", token);
      }
      const refreshToken = headers.get("x-refresh-token");
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
    return response;
  });
});

const client = new ApolloClient({
  link: afterwareLink.concat(authLink.concat(httpLink)),
  cache
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
