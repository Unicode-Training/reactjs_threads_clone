import { RouteNames } from "@/constants/route";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthMiddleware() {
  const { isLoading, isAuth, user } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  if (isLoading) {
    return;
  }
  if (location.pathname === RouteNames.CONFIRM_ACCOUNT) {
    if (!isAuth) {
      return <Navigate to={RouteNames.AUTH_LOGIN} />;
    }
    if (user?.status) {
      return <Navigate to={RouteNames.HOME} />;
    }
  }

  return <Outlet />;
}
