import { Link, Outlet, useLocation } from "react-router-dom";
import authBg from "./images/THmkXhzz2_a.avif";
import { cn } from "@/lib/utils";
import { RouteNames } from "@/constants/route";
export default function AuthLayout() {
  const location = useLocation();

  return (
    <div
      style={
        {
          "--image-url": `url(${authBg})`,
        } as React.CSSProperties
      }
      className={`min-h-screen flex items-center justify-center bg-no-repeat bg-none lg:bg-[center_-50%] lg:bg-[length:120%] lg:bg-[image:var(--image-url)]`}
    >
      <div
        style={{
          width:
            location.pathname === RouteNames.AUTH_REGISTER ? "650px" : "418px",
        }}
        className={cn(`mx-auto px-[24px] pt-[15vh]`)}
      >
        <Outlet />
      </div>
      <ul className="flex gap-2 justify-center absolute bottom-4 left-0 right-0 text-[13px] text-[gray]">
        <li>© 2024</li>
        <li>
          <Link to={"#"} className="hover:underline">
            Threads Terms
          </Link>
        </li>
        <li>
          <Link to={"#"} className="hover:underline">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to={"#"} className="hover:underline">
            Cookies Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
