import { Button } from "@/components/ui/button";

/**
 * Private dashboard component for authenticated users
 * @component
 */
function PrivateDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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
