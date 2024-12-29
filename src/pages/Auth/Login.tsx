import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  return (
    <div>
      <h1 className="text-center text-black font-[700] mb-[20px]">
        Log in with your Instagram account
      </h1>
      <form>
        <Input
          type="text"
          placeholder="Username, phone or email"
          className="mb-5 bg-[rgb(245,245,245)] py-6"
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-5 bg-[rgb(245,245,245)] py-6"
        />
        <Button
          size={null}
          className="w-full py-4 disabled:opacity-100 disabled:text-[gray]"
          disabled
        >
          Log in
        </Button>
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
