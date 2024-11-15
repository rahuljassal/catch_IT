import { Button } from "@/components/ui/button";

/**
 * Private dashboard component for authenticated users
 * @component
 */
import { useAuth } from "@clerk/clerk-react";

function TestComponent() {
  const { getToken } = useAuth();

  const logToken = async () => {
    const token = await getToken();
    console.log("JWT Token:", token);
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
