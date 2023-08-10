import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/apollo-client";
import { RootModule } from "./modules";
import { CurrentUserProvider } from "./modules/common/providers/CurrentUserProvider";

function App() {
  return (
    <ApolloProvider client={client}>
      <CurrentUserProvider>
        <RootModule />
      </CurrentUserProvider>
    </ApolloProvider>
  );
}

export default App;
