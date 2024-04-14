import Routes from "./Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <GoogleOAuthProvider clientId="768538314994-p5vd57mgvr062bip9pcjbjp6fq0gbc4u.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
