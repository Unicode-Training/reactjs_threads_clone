import { RouteNames } from "@/constants/route";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import VerifyMiddleware from "@/middlewares/VerifyMiddleware";
import ActiveAccount from "@/pages/Account/ActiveAccount";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import { Route } from "react-router-dom";

export const publicRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route element={<VerifyMiddleware />}>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.SEARCH} element={<Search />} />
      </Route>
      <Route path={RouteNames.ACTIVE_ACCOUNT} element={<ActiveAccount />} />
    </Route>
    <Route element={<GuestMiddleware />}>
      <Route element={<AuthLayout />}>
        <Route path={RouteNames.AUTH_LOGIN} element={<Login />} />
        <Route path={RouteNames.AUTH_REGISTER} element={<Register />} />
        <Route
          path={RouteNames.AUH_RESET_PASSWORD}
          element={<ResetPassword />}
        />
      </Route>
    </Route>
  </>
);
