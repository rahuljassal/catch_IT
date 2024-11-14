import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App({ children }) {
  return (
    <header>
      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
    </header>
  );
}
