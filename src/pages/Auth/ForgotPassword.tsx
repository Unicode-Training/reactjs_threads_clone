import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword({
  isShow = false,
  onOpenChange,
}: {
  isShow: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isShow} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Please provide your email for reset password
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <div className="col-span-3">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full"
            />
            {/* <span className="text-red-500 text-sm">Lỗi</span> */}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
