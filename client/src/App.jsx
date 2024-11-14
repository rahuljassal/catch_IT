import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { AppRoutes } from "./routes";
import { Button } from "./components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <SignedIn>
        <header className="h-16 flex justify-between items-center px-6 border-b">
          <p className="font-semibold text-lg">Catch IT !</p>
          <UserButton showName />
        </header>
        <AppRoutes />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <Button variant="default" onClick={() => navigate("/public")}>
            Continue as Guest
          </Button>
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </div>
  );
}
