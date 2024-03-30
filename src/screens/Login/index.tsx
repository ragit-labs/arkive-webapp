import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { authenticate, getUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user: currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/home");
  }, [currentUser]);

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

  return (
    <div>
      <h2>Google Login</h2>
      <br />
      <br />
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  );
};

export default Login;
