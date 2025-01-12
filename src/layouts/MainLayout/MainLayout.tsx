import { RouteNames } from "@/constants/route";
import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch, RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  useEffect(() => {
    dispatch(getAuthProfile());
  }, []);

  if (
    !isLoading &&
    !user?.status &&
    location.pathname !== RouteNames.CONFIRM_ACCOUNT &&
    location.pathname !== RouteNames.ACTIVE_ACCOUNT
  ) {
    return <Navigate to={RouteNames.CONFIRM_ACCOUNT} />;
  }
  return (
    <div className="main-layout py-3 w-[80%] mx-auto">
      <Outlet />
    </div>
  );
}
