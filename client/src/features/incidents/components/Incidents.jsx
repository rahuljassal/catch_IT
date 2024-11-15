import { Button } from "@/components/ui/button";

/**
 * Incidents management component
 * @component
 */
function Incidents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Incidents</h1>
        <Button variant="success">Report Incident</Button>
      </div>

      <section className="grid gap-4">{/* Add incidents list here */}</section>
    </div>
  );
}

// Only use default export for lazy-loaded components
export default Incidents;
