import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to={"/auth/login"} />;
  }
  return <Outlet />;
}
