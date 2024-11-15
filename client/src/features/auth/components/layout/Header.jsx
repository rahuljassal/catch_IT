import { UserButton } from "@clerk/clerk-react";

/**
 * Header component with user navigation
 * @component
 */
export function Header() {
  return (
    <header className="h-16 flex justify-between items-center px-6 border-b">
      <div className="flex items-center space-x-8">
        <p className="font-semibold text-lg">Catch IT !</p>
      </div>
      <div className="flex items-center space-x-4">
        <UserButton />
      </div>
    </header>
  );
}
