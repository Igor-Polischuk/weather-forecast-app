import { REFRESH } from '@/modules/auth/graphql/mutation/refresh';
import { ApolloClient, ApolloLink, InMemoryCache, Observable, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors && graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
    if (operation.operationName === 'Refresh' || operation.operationName === 'Login') {
      return
    }

    return new Observable((observer) => {
      (async () => {
        try {
          const token = await refreshToken();

          if(!token) {
            throw new Error('Refresh token is invalid')
          }
          
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          forward(operation).subscribe(subscriber);
        } catch (e) {
          observer.error(e);
          return
        }
      })()
    })
  }
})



export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});



const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate({
      mutation: REFRESH,
    });
    
    const accessToken = refreshResolverResponse.data?.refresh.accessToken;

    localStorage.setItem('token', accessToken || '');

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
