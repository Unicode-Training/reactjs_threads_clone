import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveLocalRefreshToken, saveLocalToken } from "@/utils/auth";
import { MESSAGES } from "@/constants/message";
import { requestLogin } from "@/services/authService";
const TIMEOUT = 1000;
export default function Login() {
  const { toast } = useToast();
  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (formData: unknown) => {
    const { username: email, password } = formData as {
      username: string;
      password: string;
    };
    try {
      setDisabled(true);
      const data = await requestLogin({ email, password });
      saveLocalToken(data.access_token);
      saveLocalRefreshToken(data.refresh_token);
      toast({
        title: MESSAGES.AUTH.AUTHENTICATED,
      });
      setTimeout(() => {
        navigate("/");
      }, TIMEOUT);
    } catch {
      toast({
        title: MESSAGES.AUTH.UNAUTHENTICATED,
      });
    } finally {
      setDisabled(false);
    }
  };
  useEffect(() => {
    trigger(["username", "password"], {
      shouldFocus: true,
    });
    setDisabled(false);
  }, []);

  return (
    <div>
      <h1 className="text-center text-black font-[700] mb-[20px]">
        Log in with your Instagram account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Username, phone or email"
          className="mb-5 bg-[rgb(245,245,245)] py-6"
          {...register("username", {
            required: {
              value: true,
              message: MESSAGES.AUTH.USERNAME_INVALID,
            },
          })}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-5 bg-[rgb(245,245,245)] py-6"
          {...register("password", {
            required: {
              value: true,
              message: MESSAGES.AUTH.PASSWORD_INVALID,
            },
          })}
        />
        {
          <Button
            size={null}
            className="w-full py-4 disabled:opacity-100 disabled:text-[gray]"
            disabled={isDisabled || Object.keys(errors).length > 0}
          >
            Log in
          </Button>
        }
      </form>
      <div className="flex justify-center mt-[20px]">
        <Link to="/forgot-password" className="text-[#999]">
          Forgot password?
        </Link>
      </div>
      <div className="flex mt-[20px] gap-3 items-center justify-center text-[#999]">
        <Separator className="w-[20px]" />
        <span>or</span>
        <Separator className="w-[20px]" />
      </div>
      <div className="flex justify-between gap-5 mt-[20px]">
        <Button variant={"outline"} className="w-full">
          <FaFacebookSquare /> Facebook
        </Button>
        <Button variant={"outline"} className="w-full">
          <FaGoogle /> Google
        </Button>
      </div>
      <div className="flex justify-center mt-[20px] gap-3">
        <span>Have not an account?</span>
        <Link to="/register" className="text-[#999]">
          Register now
        </Link>
      </div>
    </div>
  );
}
