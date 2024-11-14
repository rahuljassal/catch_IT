import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

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

// Public layout component
const PublicLayout = ({ children }) => (
  <div className="min-h-screen p-6">
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Catch IT Public Dashboard</h1>
        <Button variant="outline" asChild>
          <Link to="/">Sign In</Link>
        </Button>
      </div>
    </header>
    {children}
  </div>
);

// Public Dashboard with layout
const PublicDashboard = () => (
  <PublicLayout>
    <div>Public Dashboard Content</div>
  </PublicLayout>
);

export function AppRoutes() {
  const { isSignedIn, isLoading } = useAuth();
  const { userType } = useUser();

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

      {/* Public Route */}
      <Route
        path="/public"
        element={
          userType === "guest" ? (
            <PublicDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Default redirect */}
      <Route
        path="/"
        element={
          isSignedIn ? (
            <Navigate to="/dashboard" replace />
          ) : userType === "guest" ? (
            <Navigate to="/public" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export { PublicDashboard };
