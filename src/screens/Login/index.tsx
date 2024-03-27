import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { authenticate, getUser } from "../../utils/auth";

const Login = () => {
  const { user: currentUser, setUser } = useAuth();

  const [profile, setProfile] = useState(null);

  const loginUser = async (googleAccessToken: string) => {
    try {
      const accessToken = await authenticate(googleAccessToken);
      if (accessToken) {
        const user = await getUser();
        setUser(user);
      }
    } catch (err) {
      console.log("Error while authenticate", err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => loginUser(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={currentUser?.profilePicture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {currentUser?.name}</p>
          <p>Email Address: {currentUser?.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
};

export default Login;
