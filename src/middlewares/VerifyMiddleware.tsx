import { RouteNames } from "@/constants/route";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function VerifyMiddleware() {
  const { user, isLoading, isAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  if (isLoading) {
    return;
  }
  if (
    isAuth &&
    !user?.status &&
    location.pathname !== RouteNames.CONFIRM_ACCOUNT
  ) {
    return <Navigate to={RouteNames.CONFIRM_ACCOUNT} />;
  }
  return <Outlet />;
}
