import { Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { refreshToken } from "./refresh";

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
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