import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { setUserType } from "@/store/slices/userSlice";
import { USER_TYPES } from "@/utils/constants";

/**
 * Public layout component for guest users
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function PublicLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setUserType(USER_TYPES.NONE));
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <header className="h-16 flex justify-between items-center px-6 border-b">
        <h1 className="text-2xl font-bold">Catch IT Public Dashboard</h1>
        <Button variant="outline" onClick={handleSignIn}>
          Sign In
        </Button>
      </header>
      <main className="container mx-auto p-6">{children}</main>
      <footer className="border-t p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Catch IT. All rights reserved.
      </footer>
    </div>
  );
}
