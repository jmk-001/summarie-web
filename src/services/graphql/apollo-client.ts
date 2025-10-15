import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.BASE_URL }),
  cache: new InMemoryCache(),
});
