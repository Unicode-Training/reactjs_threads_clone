import { RouteNames } from "@/constants/route";
import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch, RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestMiddleware() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getAuthProfile());
  }, []);

  if (isLoading) {
    return null;
  }
  if (isAuth) {
    return <Navigate to={RouteNames.HOME} />;
  }
  return <Outlet />;
}
