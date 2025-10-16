import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URL = `${import.meta.env.VITE_API_BASE}/graphql`;
const WS_URL = HTTP_URL.replace(/^http/i, "ws"); // turns http(s) -> ws(s)

const httpLink = new HttpLink({ uri: HTTP_URL });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// WebSocket link for subscriptions (graphql-ws)
const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    connectionParams: () => {
      const token = localStorage.getItem("accessToken");
      return token ? { authorization: `Bearer ${token}` } : {};
    },
    retryAttempts: 10,
    shouldRetry: () => true,
  })
);

// Route subs to wsLink, the rest to http(auth)
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
