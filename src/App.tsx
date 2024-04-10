import Routes from "./Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="768538314994-p5vd57mgvr062bip9pcjbjp6fq0gbc4u.apps.googleusercontent.com">
      <Routes />
    </GoogleOAuthProvider>
  );
}

export default App;
