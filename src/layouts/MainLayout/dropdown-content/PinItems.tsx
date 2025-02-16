import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
export default function PinItems() {
  return (
    <DropdownMenuContent className="w-[388px] ms-5 mb-5">
      <DropdownMenuLabel className="text-md">Pin to home</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-md">For you</DropdownMenuItem>
      <DropdownMenuItem className="text-md">Following</DropdownMenuItem>
      <DropdownMenuItem className="text-md">Like</DropdownMenuItem>
      <DropdownMenuItem className="text-md">Saved</DropdownMenuItem>
    </DropdownMenuContent>
  );
}
