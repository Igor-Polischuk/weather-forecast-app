import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/apollo-client";
import { MainModule } from "./modules";
const mainModule = new MainModule();
function App() {
  return <ApolloProvider client={client}>{mainModule.Pages}</ApolloProvider>;
}

export default App;
