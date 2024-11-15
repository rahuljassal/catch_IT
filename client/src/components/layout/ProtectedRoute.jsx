import { Navigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import { ProtectedLayout } from "@/components/ProtectedLayout";

/**
 * Protected route wrapper component
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isSignedIn - Whether user is signed in
 * @param {boolean} props.isLoading - Whether auth state is loading
 * @param {React.ReactNode} props.children - Child components to render
 */
export function ProtectedRoute({ isSignedIn, isLoading, children }) {
  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to home if not signed in
  if (!isSignedIn) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Render protected content within layout
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
