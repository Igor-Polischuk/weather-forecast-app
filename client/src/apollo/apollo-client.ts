import { REFRESH } from '@/modules/auth/graphql/mutation/refresh';
import { ApolloClient, ApolloLink, InMemoryCache, Observable, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_URL,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors && graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
    if (operation.operationName === 'Refresh' || operation.operationName === 'Login') {
      return
    }
    console.log(graphQLErrors);
    
    return new Observable((observer) => {
      (async () => {
        try {
          await refreshToken();
          
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
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});


const refreshToken = async () => {
  try {
    await client.mutate({
      mutation: REFRESH,
    });
  } catch (error) {
    console.log(error);
  }
};
