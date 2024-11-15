import { PublicLayout } from "@/components/layout/PublicLayout";

/**
 * Public dashboard component
 * @component
 */
function PublicDashboard() {
  return (
    <PublicLayout>
      <div className="space-y-6">
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">System Status</h2>
          {/* Add status components here */}
        </section>

        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">Recent Incidents</h2>
          {/* Add incidents list here */}
        </section>
      </div>
    </PublicLayout>
  );
}
export default PublicDashboard;
