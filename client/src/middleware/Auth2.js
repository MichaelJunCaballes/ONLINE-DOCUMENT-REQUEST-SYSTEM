import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store2";

export const AuthorizeUser2 = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={'/'} replace={true}></Navigate>
  }

  return children;
}

export const ProtectRoute2 = ({ children, routePrefix }) => {
  const username = useAuthStore.getState().auth.username;

  // Check if the route starts with the specified prefix
  const isStudentRoute = routePrefix && window.location.pathname.startsWith(routePrefix);

  // Redirect if not logged in or not authorized for the specific route
  if (!username || (routePrefix && !isStudentRoute)) {
    return <Navigate to={'/'} replace={true}></Navigate>
  }

  return children;
}
