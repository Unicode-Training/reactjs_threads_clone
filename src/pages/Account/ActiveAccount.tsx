import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { requestAcitveAccount } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { RouteNames } from "@/constants/route";
import { MESSAGES } from "@/constants/message";

export default function ActiveAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const handleActiveAccount = async (token: string) => {
      try {
        await requestAcitveAccount(token);
        navigate(RouteNames.HOME);
      } catch {
        toast({
          title: MESSAGES.AUTH.ACTIVE_ACCOUNT_FAILED,
        });
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      handleActiveAccount(token);
    }
  }, []);
  if (!token) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your link has expired. Please log in again.
        </AlertDescription>
      </Alert>
    );
  }
  return isLoading ? (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertDescription>System is processing your request.</AlertDescription>
    </Alert>
  ) : null;
}
