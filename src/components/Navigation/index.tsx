import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../config";
import "./Navigation.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navigation-bar">
        <p className="navigation-links">{`${APP_NAME}`}</p>
        <p className="navigation-links clickable" onClick={() => navigate("/")}>
          Home
        </p>
        <p
          className="navigation-links clickable"
          onClick={() => navigate("/profile")}
        >
          Profile
        </p>
        <p
          className="navigation-links clickable"
          onClick={() => navigate("/logout")}
        >
          Logout
        </p>
      </div>
    </>
  );
};

export default NavigationBar;
