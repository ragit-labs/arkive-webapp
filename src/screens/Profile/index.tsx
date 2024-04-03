import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import NavigationBar from "../../components/Navigation";

const Profile = () => {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <>
    <NavigationBar />
      <p>Name: {user?.full_name}</p>
      <img src={user?.display_picture_url} />
      <p>Email: {user?.email}</p>
    </>
  );
};

export default Profile;
