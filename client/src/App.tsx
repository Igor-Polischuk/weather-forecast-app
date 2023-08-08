import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/apollo-client";
import { RootModule } from "./modules";

function App() {
  return (
    <ApolloProvider client={client}>
      <RootModule />
    </ApolloProvider>
  );
}

export default App;
