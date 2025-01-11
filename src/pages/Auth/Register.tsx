import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MESSAGES } from "@/constants/message";
import { RouteNames } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  username: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { toast } = useToast();
  const onSubmit = async (formData: unknown) => {
    console.log(formData);
  };
  const handleErrors = () => {
    toast({
      title: "Please fill all the fields",
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
                    message: MESSAGES.AUTH.USERNAME_INVALID,
                  },
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <span className="text-sm text-[red]">
                  {errors.name.message}
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
                    message: MESSAGES.AUTH.USERNAME_INVALID,
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-[red]">
                  {errors.email.message}
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
                    message: MESSAGES.AUTH.USERNAME_INVALID,
                  },
                })}
              />
              {errors.phone && (
                <span className="text-sm text-[red]">
                  {errors.phone.message}
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
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.PASSWORD_INVALID,
                  },
                })}
              />
              {errors.confirm_password && (
                <span className="text-sm text-[red]">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          size={null}
          className="w-full py-4 disabled:opacity-100 disabled:text-[gray]"
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
