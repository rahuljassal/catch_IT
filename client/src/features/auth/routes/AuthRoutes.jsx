import { Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ROUTES } from "@/utils/constants";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

/**
 * Handles authentication related routing
 * @component
 */
export function AuthRoutes() {
  const { isSignedIn, isLoading } = useAuth();

  return (
    <Route
      path={ROUTES.HOME}
      element={
        isSignedIn ? (
          <Navigate to={ROUTES.DASHBOARD} replace />
        ) : (
          <Navigate to={ROUTES.PUBLIC} replace />
        )
      }
    />
  );
}
