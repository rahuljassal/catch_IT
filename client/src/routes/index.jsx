import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import { setUserType } from "../store/userSlice";

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
const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setUserType(""));
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Catch IT Public Dashboard</h1>
          <Button variant="outline" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
};

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
