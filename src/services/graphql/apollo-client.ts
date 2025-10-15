import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_API_BASE}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
