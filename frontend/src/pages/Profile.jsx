import { useContext } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth.context";

const Profile = () => {
  const { user } = useAuth();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  console.log(user);

  return (
    <>
      <h2>Profile Page</h2> 
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
