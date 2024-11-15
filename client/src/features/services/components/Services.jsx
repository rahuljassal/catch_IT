import { Button } from "@/components/ui/button";

/**
 * Services management component
 * @component
 */
function Services() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button variant="success">Add Service</Button>
      </div>

      <section className="grid gap-4">{/* Add services list here */}</section>
    </div>
  );
}

export default Services;
