import { RouteNames } from "@/constants/route";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Account from "@/pages/Account/Account";
import ConfirmAccount from "@/pages/Account/ConfirmAccount";
import { Route } from "react-router-dom";

export const privateRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route element={<AuthMiddleware />}>
        <Route path={RouteNames.ACCOUNT} element={<Account />} />
        <Route path={RouteNames.CONFIRM_ACCOUNT} element={<ConfirmAccount />} />
      </Route>
    </Route>
  </>
);
