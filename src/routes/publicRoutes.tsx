import { RouteNames } from "@/constants/route";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import GuestMiddleware from "@/middlewares/GuestMiddleware";
import ActiveAccount from "@/pages/Account/ActiveAccount";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import { Route } from "react-router-dom";

export const publicRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route path={RouteNames.HOME} element={<Home />} />
      <Route path={RouteNames.SEARCH} element={<Search />} />
      <Route path={RouteNames.ACTIVE_ACCOUNT} element={<ActiveAccount />} />
    </Route>
    <Route element={<GuestMiddleware />}>
      <Route element={<AuthLayout />}>
        <Route path={RouteNames.AUTH_LOGIN} element={<Login />} />
        <Route path={RouteNames.AUTH_REGISTER} element={<Register />} />
      </Route>
    </Route>
  </>
);
