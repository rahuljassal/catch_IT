import { SignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { USER_TYPES } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

/**
 * Sign in form component with guest access
 * @component
 */
export function SignInForm() {
  const { updateUserType } = useUser();
  const navigate = useNavigate();

  const handleGuestAccess = () => {
    updateUserType(USER_TYPES.GUEST);
    navigate("/public");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <Button variant="outline" onClick={handleGuestAccess}>
        Continue as Guest
      </Button>
      <SignIn routing="hash" />
    </div>
  );
}
