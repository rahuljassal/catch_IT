import {
  OrganizationList,
  OrganizationSwitcher,
  useOrganization,
  useOrganizationList,
  CreateOrganization,
  OrganizationProfile,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function OrganizationMembers() {
  const { organization, membership } = useOrganization();

  if (!organization) return null;

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Members</h3>
      </div>

      <div className="space-y-2">
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full",
            },
          }}
        />
      </div>
    </div>
  );
}

function OrganizationSettings() {
  const { organization } = useOrganization();

  if (!organization) return null;

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-medium">Organization Settings</h3>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "w-full",
          },
        }}
      />
    </div>
  );
}

function OrganizationDashboard() {
  const { organization } = useOrganization();
  const { userMemberships } = useOrganizationList();
  const [showCreateOrg, setShowCreateOrg] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <div className="flex items-center space-x-4">
          <OrganizationSwitcher />
          <Button onClick={() => setShowCreateOrg(!showCreateOrg)}>
            {showCreateOrg ? "Cancel" : "Create Organization"}
          </Button>
        </div>
      </div>

      {showCreateOrg && (
        <div className="border rounded-lg p-6">
          <CreateOrganization />
        </div>
      )}

      {!organization && !showCreateOrg && (
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Your Organizations</h2>
          {!userMemberships?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No organizations yet</p>
              <Button className="mt-4" onClick={() => setShowCreateOrg(true)}>
                Create your first organization
              </Button>
            </div>
          ) : (
            <OrganizationList />
          )}
        </div>
      )}

      {organization && (
        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">
              Current Organization: {organization.name}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Organization ID</p>
                <p>{organization.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p>{new Date(organization.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <OrganizationMembers />
          <OrganizationSettings />
        </div>
      )}
    </div>
  );
}

export default OrganizationDashboard;
