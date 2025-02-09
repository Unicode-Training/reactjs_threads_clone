import { RouteNames } from "@/constants/route";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaRegUser, FaHeart, FaUser, FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";
const navList = [
  {
    url: RouteNames.HOME,
    icon: <GoHome size={25} fill="rgb(184, 184, 184)" />,
    iconActive: <GoHomeFill size={25} />,
  },
  {
    url: RouteNames.SEARCH,
    icon: <IoSearch size={25} fill="rgb(184, 184, 184)" />,
    iconActive: <IoSearch size={25} />,
  },
  {
    url: "#",
    icon: (
      <FaPlus size={25} className="fill-[rgb(184,184,184)] hover:fill-[#333]" />
    ),
    active: true,
  },
  {
    url: "#",
    icon: <FaRegHeart size={25} fill="rgb(184, 184, 184)" />,
    iconActive: <FaHeart size={25} />,
  },
  {
    url: "#",
    icon: <FaRegUser size={25} fill="rgb(184, 184, 184)" />,
    iconActive: <FaUser size={25} />,
  },
];

export default function Nav() {
  const { pathname } = useLocation();
  const isActive = (url: string) => pathname === url;
  return (
    <div className="flex flex-col w-[76px] items-center justify-between fixed left-0 top-[15px] bottom-[15px]">
      <div>
        <Link to={RouteNames.HOME}>
          <img src="/assets/img/logo.svg" className="w-[34px]" />
        </Link>
      </div>
      <div>
        <ul>
          {navList.map((nav, index) => (
            <li key={index} className="mb-5">
              <Link
                to={nav.url}
                className={cn(
                  "hover:bg-[#efefef] inline-block px-3 py-2 rounded-[5px]",
                  nav.active && "bg-[#efefef]"
                )}
              >
                {isActive(nav.url) ? nav.iconActive : nav.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>Ahihi</div>
    </div>
  );
}
