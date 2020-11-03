import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { API_KEY } from '@env';

const restLink = new RestLink({
  uri: 'https//newsapi.org/v2/',
  headers: {
    Authorization: API_KEY,
  }
});

export const client = ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});