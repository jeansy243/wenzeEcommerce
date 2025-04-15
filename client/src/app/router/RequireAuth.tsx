import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

export default function RequireAuth() {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Render the child routes if the user is authenticated
  return <Outlet />;
}
