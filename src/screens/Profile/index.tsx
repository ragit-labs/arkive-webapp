import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <p>Name: {user?.full_name}</p>
      <p>Email: {user?.email}</p>
    </>
  );
};

export default Profile;
