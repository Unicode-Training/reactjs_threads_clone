import { RouteNames } from "@/constants/route";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Account from "@/pages/Account/Account";
import { Route } from "react-router-dom";

export const privateRoutes = (
  <>
    <Route element={<AuthMiddleware />}>
      <Route element={<MainLayout />}>
        <Route path={RouteNames.ACCOUNT} element={<Account />} />
      </Route>
    </Route>
  </>
);
