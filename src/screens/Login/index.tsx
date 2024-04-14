import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { authenticate, getUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import googleIcon from "../../assets/images/icons/Google.svg";

const Login = () => {
  const { user: currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);

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
    <>
      <p className="login-header">lightcone</p>
      <p className="login-title">Your Super Smart Knowledge Hub</p>
      <button className="login-button" style={{}} onClick={() => login()}>
        <img className="login-button-icon" src={googleIcon} />
        Login with Google
      </button>
    </>
  );
};

export default Login;
