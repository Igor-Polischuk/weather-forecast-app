import { ApolloClient, ApolloLink, InMemoryCache, Observable, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { REFRESH } from '../graphql/mutation.graphql';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
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
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});



const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate({
      mutation: REFRESH,
    });
    
    const accessToken = refreshResolverResponse.data?.refresh.access_token;

    localStorage.setItem('token', accessToken || '');

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

// const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//   if (graphQLErrors && graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
//     if (operation.operationName === 'Refresh' || operation.operationName === 'Login') {
//       return
//     }

//     (async () => {
//       try {
//         const token = await refreshToken();

//         operation.setContext(({ headers = {} }) => ({
//           headers: {
//             ...headers,
//             authorization: `Bearer ${token}`,
//           },
//         }));
//       } catch (e) {
//         console.log(e);
//         return
//       }
//     })()
//     return forward(operation);
//   }
// })