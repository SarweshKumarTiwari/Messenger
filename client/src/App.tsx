import { QueryClientProvider, QueryClient } from "react-query";
import AllRoutes from "./AllRoutes";
import AuthUserContext from "./AuthUserContext";

const query = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={query}>
        <AuthUserContext>
          <AllRoutes />
        </AuthUserContext>
      </QueryClientProvider>
    </div>
  );
}

export default App;
