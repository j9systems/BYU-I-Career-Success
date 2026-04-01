"use client";

import Link from "next/link";
import Image from "next/image";
import { RoleSwitcher } from "./role-switcher";

export function TopNav() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/byui-logo.svg"
          alt="BYU-Idaho"
          width={32}
          height={32}
          className="rounded-md"
        />
        <span className="font-semibold text-foreground">Career Success</span>
      </Link>
      <RoleSwitcher />
    </header>
  );
}
