import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { AppRoutes } from "./routes";
import { Button } from "./components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserType } from "./store/userSlice";
import { useUser } from "./hooks/useUser";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userType } = useUser();

  const handleGuestAccess = () => {
    dispatch(setUserType("guest"));
    navigate("/public");
  };
  console.log("userType", userType);

  return (
    <div>
      <SignedIn>
        <header className="h-16 flex justify-between items-center px-6 border-b">
          <p className="font-semibold text-lg">Catch IT !</p>
          <UserButton
            showName
            afterSignOut={() => dispatch(setUserType("guest"))}
          />
        </header>
        <AppRoutes />
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <Button variant="outline" onClick={handleGuestAccess}>
            Continue as Guest
          </Button>
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </div>
  );
}
