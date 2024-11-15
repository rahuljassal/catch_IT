import { Button } from "@/components/ui/button";

/**
 * Organisation management component
 * @component
 */
function Organisation() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organisation</h1>
        <Button variant="outline">Add Member</Button>
      </div>

      <section className="grid gap-4">
        {/* Add organisation management content here */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          {/* Add team member list/management here */}
        </div>
      </section>
    </div>
  );
}

export default Organisation;
