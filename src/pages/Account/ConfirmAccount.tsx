import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RouteNames } from "@/constants/route";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ConfirmAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleResendEmail = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Resend email success",
    });
  };
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please active account</AlertDialogTitle>
          <AlertDialogDescription>
            We sent you a link to your email address. Please check email and
            click the link
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              navigate(RouteNames.AUTH_REGISTER);
            }}
          >
            Back to Register
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleResendEmail} disabled={isLoading}>
            {isLoading ? "Resending..." : "Resend Email Active"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
