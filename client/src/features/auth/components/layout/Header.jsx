import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_TYPES } from "@/utils/constants";
import { setUserType } from "../../../../store/slices/userSlice";

/**
 * Header component with user navigation
 * @component
 */
export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(setUserType(USER_TYPES.GUEST));
    navigate("/public");
  };

  return (
    <header className="h-16 flex justify-between items-center px-6 border-b">
      <p className="font-semibold text-lg">Catch IT !</p>
      <UserButton showName afterSignOut={handleSignOut} />
    </header>
  );
}
