import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
export default function Home() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return <div>Home: {isAuth ? "Đã đăng nhập" : "Chưa đăng nhập"}</div>;
}
