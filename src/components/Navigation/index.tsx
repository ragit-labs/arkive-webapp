import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../config";
import "./Navigation.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navigation-bar">
        <p>{`${APP_NAME}`}</p>
        <p onClick={() => navigate("/home")}>Home</p>
        <p onClick={() => navigate("/profile")}>Profile</p>
        <p onClick={() => navigate("/logout")}>Logout</p>
      </div>
    </>
  );
};

export default NavigationBar;
