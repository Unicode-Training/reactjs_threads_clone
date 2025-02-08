import { RouteNames } from "@/constants/route";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

export default function Nav() {
  return (
    <div className="flex flex-col w-[76px] items-center justify-between fixed left-0 top-[15px] bottom-[15px]">
      <div>
        <Link to={RouteNames.HOME}>
          <img src="/assets/img/logo.svg" className="w-[34px]" />
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to="#">
              <GoHome size={25} fill="rgb(184, 184, 184)" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <IoSearch size={25} fill="rgb(184, 184, 184)" />
            </Link>
          </li>
        </ul>
      </div>
      <div>Ahihi</div>
    </div>
  );
}
