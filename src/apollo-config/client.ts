import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://enatega-multivendor.up.railway.app/graphql',
  }),
  cache: new InMemoryCache(),
});
