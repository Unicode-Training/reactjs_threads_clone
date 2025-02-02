import { MESSAGES } from "@/constants/message";
import { useToast } from "@/hooks/use-toast";
import {
  getGithubAccessToken,
  getGoogleAccessToken,
  requestLoginSocial,
} from "@/services/socialService";
import { saveLocalRefreshToken, saveLocalToken } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SocialLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!code) return;
    const fetchData = async () => {
      if (code && state === "google") {
        const response = await getGoogleAccessToken(code);
        const accessToken = response.data.access_token;
        if (accessToken) {
          //Gọi API đăng nhập
          const data = await requestLoginSocial(accessToken, "google");
          saveLocalToken(data.access_token);
          saveLocalRefreshToken(data.refresh_token);
          toast({
            title: MESSAGES.AUTH.AUTHENTICATED,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }

      if (code && state === "github") {
        const response = await getGithubAccessToken(code);
        const accessToken = response.data.access_token;
        if (accessToken) {
          const data = await requestLoginSocial(accessToken, "github");
          saveLocalToken(data.access_token);
          saveLocalRefreshToken(data.refresh_token);
          toast({
            title: MESSAGES.AUTH.AUTHENTICATED,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    };
    fetchData();
  }, [code]);
  return children;
}
