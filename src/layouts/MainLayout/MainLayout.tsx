import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAuthProfile());
  }, []);

  return (
    <div className="main-layout py-3 w-[80%] mx-auto">
      <Outlet />
    </div>
  );
}
