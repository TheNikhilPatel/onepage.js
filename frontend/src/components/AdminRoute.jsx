import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default AdminRoute;
