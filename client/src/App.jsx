import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
export default function App({ children }) {
  return (
    <header className="flex justify-between items-center p-4">
      <p>Catch IT !</p>
      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
    </header>
  );
}
