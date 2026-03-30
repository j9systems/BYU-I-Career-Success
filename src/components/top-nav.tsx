"use client";

import Link from "next/link";
import { RoleSwitcher } from "./role-switcher";

export function TopNav() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">BY</span>
        </div>
        <span className="font-semibold text-foreground">Career Success</span>
      </Link>
      <RoleSwitcher />
    </header>
  );
}
