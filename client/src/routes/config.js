import { lazy } from "react";
import { ROUTES } from "@/utils/constants";

// Lazy load components
const PrivateDashboard = lazy(() =>
  import("@/features/dashboard/components/PrivateDashboard")
);
const Organisation = lazy(() =>
  import("@/features/organisation/components/Organisation")
);
const Services = lazy(() => import("@/features/services/components/Services"));
const Incidents = lazy(() =>
  import("@/features/incidents/components/Incidents")
);

/**
 * Protected route configuration
 */
export const protectedRoutes = [
  {
    path: ROUTES.DASHBOARD,
    component: PrivateDashboard,
  },
  {
    path: ROUTES.ORGANISATION,
    component: Organisation,
  },
  {
    path: ROUTES.SERVICES,
    component: Services,
  },
  {
    path: ROUTES.INCIDENTS,
    component: Incidents,
  },
];

/**
 * Public route configuration
 */
export const publicRoutes = [
  {
    path: ROUTES.PUBLIC,
    component: lazy(() =>
      import("@/features/dashboard/components/PublicDashboard")
    ),
  },
];
