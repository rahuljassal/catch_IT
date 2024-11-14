import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, Server, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Organisation",
    href: "/organisation",
    icon: Building2,
  },
  {
    title: "Services",
    href: "/services",
    icon: Server,
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: AlertCircle,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-full border-r bg-background p-4">
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.href}
            variant={location.pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link to={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
