import { QueryClientProvider, QueryClient } from "react-query";
import AllRoutes from "./AllRoutes";
import {ReactQueryDevtools} from "react-query/devtools"
import AuthUserContext from "./AuthUserContext";

const query = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={query}>
        <AuthUserContext>
          <AllRoutes />
        </AuthUserContext>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
