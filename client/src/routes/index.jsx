import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@/hooks/useUser";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ROUTES, USER_TYPES } from "@/utils/constants";
import { protectedRoutes, publicRoutes } from "./config";
import { Suspense } from "react";

/**
 * Main routing component
 * @component
 */
export function AppRoutes() {
  const { isSignedIn, isLoading } = useAuth();
  const { userType } = useUser();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Protected Routes */}
        {protectedRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading}>
                <Component />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Public Routes */}
        {publicRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              userType === USER_TYPES.GUEST ? (
                <Component />
              ) : (
                <Navigate to={ROUTES.HOME} replace />
              )
            }
          />
        ))}

        {/* Default Route */}
        <Route
          path={ROUTES.HOME}
          element={
            isSignedIn ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : userType === USER_TYPES.GUEST ? (
              <Navigate to={ROUTES.PUBLIC} replace />
            ) : (
              <Navigate to={ROUTES.HOME} replace />
            )
          }
        />
      </Routes>
    </Suspense>
  );
}
