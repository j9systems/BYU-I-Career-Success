"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface PortalSidebarProps {
  items: NavItem[];
  portalTitle: string;
}

export function PortalSidebar({ items, portalTitle }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r bg-white min-h-[calc(100vh-57px)] p-4">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
        {portalTitle}
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
