import Routes from "./Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "1600px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "88%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <GoogleOAuthProvider clientId="768538314994-p5vd57mgvr062bip9pcjbjp6fq0gbc4u.apps.googleusercontent.com">
          <Routes />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
