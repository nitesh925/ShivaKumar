import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser.email !== "2100031156.cse.h@gmail.com") return <Navigate to="/home" />;

  return children;
};

export default AdminRoute;
