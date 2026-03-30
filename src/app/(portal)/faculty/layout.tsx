"use client";

import { PortalSidebar } from "@/components/portal-sidebar";
import { LayoutDashboard, Users, Handshake, Building2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/faculty/students", icon: Users },
  { label: "Introductions", href: "/faculty/introductions", icon: Handshake },
  { label: "Employers", href: "/faculty/employers", icon: Building2 },
];

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <PortalSidebar items={navItems} portalTitle="Faculty Portal" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
