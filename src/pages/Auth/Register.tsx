import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MESSAGES } from "@/constants/message";
import { RouteNames } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { requestLogin, requestRegister } from "@/services/authService";
import { useState } from "react";
import { AxiosError } from "axios";
import { saveLocalRefreshToken, saveLocalToken } from "@/utils/auth";
import { CONSTANTS } from "@/constants/const";
type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  username: string;
};

type ServerError = {
  [key: string]: string[];
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [isDisabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<ServerError>(
    {} as ServerError
  );
  const onSubmit = async (formData: Inputs) => {
    try {
      setDisabled(true);
      await requestRegister(formData);
      const { email, password } = formData;
      const data = await requestLogin({ email, password });
      saveLocalToken(data.access_token);
      saveLocalRefreshToken(data.refresh_token);
      toast({
        title: MESSAGES.AUTH.REGISTER_SUCCESS,
      });
      setTimeout(() => {
        navigate(RouteNames.CONFIRM_ACCOUNT);
      }, CONSTANTS.TIMEOUT);
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as { errors: ServerError };
      setServerErrors(data.errors);
      toast({
        title: MESSAGES.AUTH.REGISTER_FAILED,
      });
    } finally {
      setDisabled(false);
    }
  };
  const handleErrors = () => {
    toast({
      title: MESSAGES.AUTH.REGISTER_VALIDATE_FAILED,
    });
  };
  return (
    <div>
      <h1 className="text-center text-black font-[700] mb-[20px]">
        Register an account
      </h1>
      <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Display Name"
                className=" bg-[rgb(245,245,245)] py-6"
                {...register("name", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.NAME_INVALID,
                  },
                  minLength: {
                    value: 2,
                    message: MESSAGES.AUTH.NAME_TOO_SHORT,
                  },
                })}
              />
              {errors.name && (
                <span className="text-sm text-[red]">
                  {errors.name.message}
                </span>
              )}
              {serverErrors.name && (
                <span className="text-sm text-[red]">
                  {serverErrors.name[0]}
                </span>
              )}
            </div>
            <div className="mb-5">
              <Input
                type="email"
                placeholder="Email"
                className="bg-[rgb(245,245,245)] py-6"
                {...register("email", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.EMAIL_INVALID,
                  },
                  pattern: {
                    value: /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                    message: MESSAGES.AUTH.EMAIL_INVALID_FORMAT,
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-[red]">
                  {errors.email.message}
                </span>
              )}
              {serverErrors.email && (
                <span className="text-sm text-[red]">
                  {serverErrors.email[0]}
                </span>
              )}
            </div>

            <div className="mb-5">
              <Input
                type="text"
                placeholder="Phone"
                className="bg-[rgb(245,245,245)] py-6"
                {...register("phone", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.PHONE_INVALID,
                  },
                  pattern: {
                    value: /^0\d{9}$/i,
                    message: MESSAGES.AUTH.PHONE_INVALID_FORMAT,
                  },
                })}
              />
              {errors.phone && (
                <span className="text-sm text-[red]">
                  {errors.phone.message}
                </span>
              )}
              {serverErrors.phone && (
                <span className="text-sm text-[red]">
                  {serverErrors.phone[0]}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Username"
                className="bg-[rgb(245,245,245)] py-6"
                {...register("username", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.USERNAME_INVALID,
                  },
                })}
              />
              {errors.username && (
                <span className="text-sm text-[red]">
                  {errors.username.message}
                </span>
              )}
              {serverErrors.username && (
                <span className="text-sm text-[red]">
                  {serverErrors.username[0]}
                </span>
              )}
            </div>
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
              {serverErrors.password && (
                <span className="text-sm text-[red]">
                  {serverErrors.password[0]}
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
              {serverErrors.password_confirmation && (
                <span className="text-sm text-[red]">
                  {serverErrors.password_confirmation[0]}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          size={null}
          className="w-full py-4 disabled:opacity-100 disabled:text-[gray]"
          disabled={isDisabled}
        >
          Register
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
