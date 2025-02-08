import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { requestResendEmailActive } from "@/services/authService";
import { useLogout } from "@/hooks/use-logout";
import { RouteNames } from "@/constants/route";
import { MESSAGES } from "@/constants/message";
export default function ConfirmAccount() {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const { logout } = useLogout();
  const handleResendEmail = async () => {
    try {
      setLoading(true);
      await requestResendEmailActive();
      toast({
        title: MESSAGES.AUTH.RESEND_ACTIVE_EMAIL_SUCCESS,
      });
    } catch {
      toast({
        title: MESSAGES.AUTH.RESEND_ACTIVE_EMAIL_FAILED,
      });
    } finally {
      setLoading(false);
    }
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
          <AlertDialogCancel onClick={() => logout(RouteNames.AUTH_LOGIN)}>
            Logout
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleResendEmail} disabled={isLoading}>
            {isLoading ? "Resending..." : "Resend Email Active"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
