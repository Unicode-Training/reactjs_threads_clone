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
import { MESSAGES } from "@/constants/message";
import { useToast } from "@/hooks/use-toast";
import { requestForgotPassword } from "@/services/authService";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Inputs = {
  email: string;
};
export default function ForgotPassword({
  isShow = false,
  onOpenChange,
}: {
  isShow: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { toast } = useToast();
  const [isDisabled, setDisabled] = useState(false);
  const onSubmit = async (formData: Inputs) => {
    const { email } = formData;
    try {
      setDisabled(true);
      await requestForgotPassword(email);
      toast({
        title: MESSAGES.AUTH.FORGOT_PASSWORD_SUCCESS,
      });
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as {
        message: string;
      };
      toast({
        title: data.message,
      });
    } finally {
      setDisabled(false);
    }
  };
  return (
    <Dialog open={isShow} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Please provide your email for reset password
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4 mb-3">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full"
                {...register("email", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.EMAIL_INVALID,
                  },
                  pattern: {
                    value: /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                    message: MESSAGES.AUTH.EMAIL_INVALID_FORMAT,
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isDisabled}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
