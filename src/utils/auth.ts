export const saveLocalToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const saveLocalRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};

export const getLocalToken = () => {
  return localStorage.getItem("access_token");
};

export const removeLocalToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
