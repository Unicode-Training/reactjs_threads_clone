import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouteNames } from "@/constants/route";
import { Separator } from "@radix-ui/react-separator";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MESSAGES } from "@/constants/message";
import { useForm } from "react-hook-form";
import { requestResetPassword } from "@/services/authService";
import { AxiosError } from "axios";
type Inputs = {
  password: string;
  password_confirmation: string;
};
export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [isDisabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const onSubmit = async (formData: Inputs) => {
    try {
      setDisabled(true);
      await requestResetPassword({ ...formData, token });
      toast({
        title: MESSAGES.AUTH.RESET_PASSWORD_SUCCESS,
      });
      setTimeout(() => {
        navigate(RouteNames.AUTH_LOGIN);
      }, 1000);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        const data = err.response?.data as { message: string };
        return toast({
          title: data.message,
        });
      }
      toast({
        title: MESSAGES.AUTH.RESET_PASSWORD_FAILED,
      });
    } finally {
      setDisabled(false);
    }
  };
  const handleErrors = () => {
    toast({
      title: MESSAGES.AUTH.RESET_PASSWORD_VALIDATE_FAILED,
    });
  };
  useEffect(() => {
    if (!token) {
      navigate(RouteNames.AUTH_LOGIN);
    }
  }, []);
  return (
    <div>
      <h1 className="text-center text-black font-[700] mb-[20px]">
        Reset password
      </h1>
      <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
        <div className="mb-5">
          <Input
            type="password"
            placeholder="Password"
            className=" bg-[rgb(245,245,245)] py-6"
            {...register("password", {
              required: {
                value: true,
                message: MESSAGES.AUTH.PASSWORD_INVALID,
              },
              minLength: {
                value: 6,
                message: MESSAGES.AUTH.PASSWORD_TOO_SHORT,
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-[red]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <Input
            type="password"
            placeholder="Confirm Password"
            className=" bg-[rgb(245,245,245)] py-6"
            {...register("password_confirmation", {
              required: {
                value: true,
                message: MESSAGES.AUTH.CONFIRM_PASSWORD_INVALID,
              },
              validate: (value: string) => {
                return value !== watch("password")
                  ? MESSAGES.AUTH.CONFIRM_PASSWORD_MISMATCH
                  : true;
              },
            })}
          />
          {errors.password_confirmation && (
            <span className="text-sm text-[red]">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>
        <Button
          size={null}
          className="w-full py-4 disabled:opacity-100 disabled:text-[gray]"
          disabled={isDisabled}
        >
          Reset Password
        </Button>
      </form>
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
        <span>Already have an account?</span>
        <Link to={RouteNames.AUTH_LOGIN} className="text-[#999]">
          Login now
        </Link>
      </div>
    </div>
  );
}
