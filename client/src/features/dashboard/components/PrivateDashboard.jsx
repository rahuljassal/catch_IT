import { Button } from "@/components/ui/button";

/**
 * Private dashboard component for authenticated users
 * @component
 */
import { useAuth } from "@clerk/clerk-react";
export const baseURL = import.meta.env.VITE_REACT_APP_BACKEND;
function TestComponent() {
  const { getToken } = useAuth();

  const logToken = async () => {
    try {
      const token = await getToken({
        template: "long-lasting",
        audience: "http://localhost:8000",
      });
      console.log("JWT Token:", token);

      // Debug: Decode token to check audience
      const decoded = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded token:", decoded);
      console.log("Audience:", decoded.aud);
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  return (
    <Button variant="success" onClick={logToken}>
      Log Token
    </Button>
  );
}
function PrivateDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TestComponent />
        <Button variant="success" onClick={() => console.log("clicked")}>
          Toggle theme
        </Button>
      </div>

      <section className="grid gap-4">
        {/* Add dashboard content here */}
      </section>
    </div>
  );
}

export default PrivateDashboard;
