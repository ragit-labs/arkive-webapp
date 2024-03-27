import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/Home";
import Login from "./screens/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "./context/AuthContext";
import Profile from "./screens/Profile";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <GoogleOAuthProvider clientId="768538314994-p5vd57mgvr062bip9pcjbjp6fq0gbc4u.apps.googleusercontent.com">
      <Router>
        <Routes>
          {!isAuthenticated && <Route path="/login" element={<Login />} />}
          {isAuthenticated && (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
