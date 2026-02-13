import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in → allow access
  return children;
};

export default ProtectedRoute;
