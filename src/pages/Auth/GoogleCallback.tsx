import {
  getGoogleAccessToken,
  requestLoginSocial,
} from "@/services/socialService";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  useEffect(() => {
    const fetchData = async () => {
      if (code && state === "google") {
        const response = await getGoogleAccessToken(code);
        const accessToken = response.data.access_token;
        if (accessToken) {
          //Gọi API đăng nhập
          const data = await requestLoginSocial(accessToken, "google");
          console.log(data);
        }
      }
    };
    fetchData();
  }, [code]);

  return <div>Loading...</div>;
}
