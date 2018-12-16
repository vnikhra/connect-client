import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLinkInit = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true
  }
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

const httpLink = afterwareLink.concat(authLink.concat(httpLinkInit));

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache
});

export default client;
