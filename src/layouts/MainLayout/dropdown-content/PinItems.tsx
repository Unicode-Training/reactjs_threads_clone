import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FaAngleRight } from "react-icons/fa6";
import CustomFeeds from "./CustomFeeds";
import { useEffect, useState } from "react";
export default function PinItems({
  onOpenDropdown,
}: {
  onOpenDropdown: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      onOpenDropdown(false);
    }
  }, [open]);
  return (
    <DropdownMenuContent className="w-[388px] ms-5 mb-5">
      {!open ? (
        <>
          <DropdownMenuLabel className="text-md">Pin to home</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-md">For you</DropdownMenuItem>
          <DropdownMenuItem className="text-md">Following</DropdownMenuItem>
          <DropdownMenuItem className="text-md">Like</DropdownMenuItem>
          <DropdownMenuItem className="text-md">Saved</DropdownMenuItem>
          <DropdownMenuItem
            className="text-md flex justify-between"
            onClick={() => {
              onOpenDropdown(true);
              setOpen(true);
            }}
          >
            Custom feeds <FaAngleRight />
          </DropdownMenuItem>
        </>
      ) : (
        <CustomFeeds
          onBackParent={() => {
            setOpen(false);
          }}
        />
      )}
    </DropdownMenuContent>
  );
}
