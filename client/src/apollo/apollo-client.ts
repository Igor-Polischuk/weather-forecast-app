import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { errorLink } from './error-link';


const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_URL,
  credentials: 'include',
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
