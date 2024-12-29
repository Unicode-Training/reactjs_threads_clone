import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "@/stores/slices/authSlice";
import { RootState } from "@/stores/store";
export default function Home() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authSlice.actions.updateStatus(true));
  }, []);
  console.log(isAuth);

  return <div>Home</div>;
}
