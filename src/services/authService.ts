import { RouteNames } from "@/constants/route";
import { client } from "../utils/client";
import { getLocalToken } from "@/utils/auth";
export const requestLogin = async (dataLogin: {
  email: string;
  password: string;
}) => {
  const { data } = await client.post("/auth/login", dataLogin);
  return data;
};

export const requestRegister = async (dataRegister: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  username: string;
}) => {
  const { data } = await client.post("/auth/register", {
    ...dataRegister,
    url_target: window.location.origin + RouteNames.ACTIVE_ACCOUNT,
  });
  return data;
};

export const requestResendEmailActive = async () => {
  const token = getLocalToken();
  if (!token) {
    throw new Error("Token not exist");
  }
  const data = await client.post(
    "/auth/email/send-verification",
    {
      url_target: window.location.origin + RouteNames.ACTIVE_ACCOUNT,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const requestAcitveAccount = async (token: string) => {
  const data = await client.patch(`/confirm-account`, {
    token,
  });
  return data;
};

export const requestLogout = async () => {
  const accessToken = getLocalToken();
  if (!accessToken) {
    throw new Error("Token not exist");
  }
  const data = await client.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const requestForgotPassword = async (email: string) => {
  const data = await client.post(`/forgot-password`, {
    email,
    url_target: window.location.origin + RouteNames.AUH_RESET_PASSWORD,
  });
  return data;
};
