import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { Button } from "../components/ui/button";

// Protected Route Wrapper
const ProtectedRoute = ({ children, isSignedIn, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/public" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

// Placeholder components (move to separate files later)
const Dashboard = () => {
  return (
    <>
      {" "}
      <Button variant="success" onClick={() => console.log("clicked")}>
        Toggle theme
      </Button>
      <div>Dashboard Page</div>
    </>
  );
};
const Organisation = () => <div>Organisation Page</div>;
const Services = () => <div>Services Page</div>;
const Incidents = () => <div>Incidents Page</div>;
const PublicDashboard = () => <div>Public Dashboard</div>;

export function AppRoutes() {
  const { isSignedIn, isLoading } = useAuth();
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organisation"
        element={
          <ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading}>
            <Organisation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading}>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incidents"
        element={
          <ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading}>
            <Incidents />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/public" element={<PublicDashboard />} />

      {/* Default redirect */}
      <Route
        path="/"
        element={
          <Navigate to={isSignedIn ? "/dashboard" : "/public"} replace />
        }
      />
      {/* <Route path="*" element={<Navigate to="/public" replace />} /> */}
    </Routes>
  );
}
