import Header from "@Components/Header";
import MainForm from "@Components/MainForm";
import Sidebar from "@Components/Sidebar";
import Receipt from "@Components/Receipt";
import GraphQLProvider from "@Context/GraphqlContext";
import UserProvider from "@Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
function App() {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <UserProvider>
          <GraphQLProvider>
            <div className="flex flex-col h-screen w-screen">
              <Header />
              <div className="flex bg-grape">
                <div className="grow flex justify-around">
                  <MainForm />
                  <Receipt />
                </div>
                <Sidebar />
              </div>
            </div>
          </GraphQLProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
