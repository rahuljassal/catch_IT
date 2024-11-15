import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@/hooks/useUser";
import PublicDashboard from "@/features/dashboard/components/PublicDashboard";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { USER_TYPES } from "@/utils/constants";
import { Header } from "./features/auth/components/layout/Header";
import { AppRoutes } from "./routes";

/**
 * Root application component
 * @component
 */
export default function App() {
  const { userType } = useUser();

  return (
    <div>
      <SignedIn>
        <Header />
        <AppRoutes />
      </SignedIn>

      <SignedOut>
        {userType === USER_TYPES.GUEST ? <PublicDashboard /> : <SignInForm />}
      </SignedOut>
    </div>
  );
}
