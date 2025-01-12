import { requestLogout } from "@/services/authService";
import { removeLocalToken } from "@/utils/auth";
export const useLogout = () => {
  // const navigate = useNavigate();
  const logout = async (redirectTo: string = "/") => {
    await requestLogout();
    removeLocalToken();
    window.location.href = redirectTo;
  };
  return { logout };
};

//const {logout} = useLogout();
