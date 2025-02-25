import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { FaArrowLeft } from "react-icons/fa6";
import { MdAddChart } from "react-icons/md";

export default function CustomFeeds({
  onBackParent,
}: {
  onBackParent: () => void;
}) {
  return (
    <>
      <DropdownMenuLabel className="text-md flex justify-between">
        <FaArrowLeft onClick={onBackParent} />
        Custom feeds
        <MdAddChart />
      </DropdownMenuLabel>
      <div className="px-2">
        <p>Empty</p>
      </div>
    </>
  );
}
