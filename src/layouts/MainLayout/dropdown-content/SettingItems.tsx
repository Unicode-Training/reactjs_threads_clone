import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
export default function SettingItems() {
  return (
    <DropdownMenuContent className="w-[220px] ms-5 mb-5">
      <DropdownMenuItem className="text-md">Appearance</DropdownMenuItem>
      <DropdownMenuItem className="text-md">Insights</DropdownMenuItem>
      <DropdownMenuItem className="text-md">Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-md">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  );
}
