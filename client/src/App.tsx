import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/apollo-client";
import { MainModule } from "./modules";
import { CurrentUserProvider } from "./modules/common/providers/CurrentUserProvider";

function App() {
  return (
    <ApolloProvider client={client}>
      <CurrentUserProvider>
        {MainModule.components.AppRouter}
      </CurrentUserProvider>
    </ApolloProvider>
  );
}

export default App;
