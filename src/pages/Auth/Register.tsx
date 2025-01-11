import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { MESSAGES } from "@/constants/message";
import { RouteNames } from "@/constants/route";
export default function Register() {
  const [isDisabled, setDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (formData: unknown) => {
    console.log(formData);
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
        Register an account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Display Name"
              className="mb-5 bg-[rgb(245,245,245)] py-6"
              {...register("name", {
                required: {
                  value: true,
                  message: MESSAGES.AUTH.USERNAME_INVALID,
                },
              })}
            />
            <Input
              type="email"
              placeholder="Email"
              className="mb-5 bg-[rgb(245,245,245)] py-6"
              {...register("email", {
                required: {
                  value: true,
                  message: MESSAGES.AUTH.USERNAME_INVALID,
                },
              })}
            />
            <Input
              type="text"
              placeholder="Phone"
              className="mb-5 bg-[rgb(245,245,245)] py-6"
              {...register("phone", {
                required: {
                  value: true,
                  message: MESSAGES.AUTH.USERNAME_INVALID,
                },
              })}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Username"
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
            <Input
              type="password"
              placeholder="Confirm Password"
              className="mb-5 bg-[rgb(245,245,245)] py-6"
              {...register("confirm_password", {
                required: {
                  value: true,
                  message: MESSAGES.AUTH.PASSWORD_INVALID,
                },
              })}
            />
          </div>
        </div>
        <Button
          size={null}
          className="w-full py-4 disabled:opacity-100 disabled:text-[gray]"
          disabled={isDisabled || Object.keys(errors).length > 0}
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
