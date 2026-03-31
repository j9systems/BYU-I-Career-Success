"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const portals = [
  { label: "Student", href: "/student/dashboard", icon: GraduationCap, prefix: "/student" },
  { label: "Faculty", href: "/faculty/dashboard", icon: Users, prefix: "/faculty" },
  { label: "Employer", href: "/employer/dashboard", icon: Building2, prefix: "/employer" },
];

export function RoleSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      {portals.map((p) => {
        const active = pathname.startsWith(p.prefix);
        return (
          <Link
            key={p.prefix}
            href={p.href}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <p.icon className="w-4 h-4" />
            {p.label}
          </Link>
        );
      })}
    </div>
  );
}
