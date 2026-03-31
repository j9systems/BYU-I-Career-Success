"use client";

import { PortalSidebar } from "@/components/portal-sidebar";
import { LayoutDashboard, User, FileText, Briefcase, Mail } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Resume", href: "/student/resume", icon: FileText },
  { label: "Jobs", href: "/student/jobs", icon: Briefcase },
  { label: "Messages", href: "/student/messages", icon: Mail },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <PortalSidebar items={navItems} portalTitle="Student Portal" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
