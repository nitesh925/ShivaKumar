import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = useAuth();

  // If context is not ready yet
  if (!auth) return null;

  const { currentUser, loading } = auth;

  // Wait until Firebase finishes checking login
  if (loading) return null;

  // Not logged in
  if (!currentUser) return <Navigate to="/login" replace />;

  // Not admin
  if (currentUser.email !== "2100031156.cse.h@gmail.com") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
