"use client";

import { PortalSidebar } from "@/components/portal-sidebar";
import { LayoutDashboard, Briefcase, Users } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/employer/jobs", icon: Briefcase },
  { label: "Students", href: "/employer/students", icon: Users },
];

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <PortalSidebar items={navItems} portalTitle="Employer Portal" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
