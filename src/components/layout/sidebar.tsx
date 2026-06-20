"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Map, FolderGit2, Brain,
  MessageSquare, BarChart3, StickyNote, User, Menu, X,
} from "lucide-react";
import { SupraLearnLogo } from "@/components/brand/supra-learn-logo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTotalWeeks } from "@/hooks/use-curriculum";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/ai-skills", label: "AI Skills", icon: Brain },
  { href: "/interview", label: "Interview", icon: MessageSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/notes", label: "Notes", icon: StickyNote },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalWeeks = useTotalWeeks();

  const NavContent = () => (
    <>
      <div className="px-4 py-6">
        <Link href="/" className="block rounded-xl transition-opacity hover:opacity-90">
          <SupraLearnLogo size="sm" tagline="Master Technology" />
        </Link>
        <p className="mt-3 px-0.5 text-[10px] text-zinc-600">{totalWeeks}-week curriculum</p>
      </div>
      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              <item.icon className={cn("h-4 w-4", active && "text-indigo-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-lg bg-zinc-800/50 p-3">
          <p className="text-xs text-zinc-500">Shortcuts</p>
          <p className="text-xs font-mono text-zinc-400">
            <kbd className="rounded bg-zinc-700 px-1.5 py-0.5">⌘</kbd> + <kbd className="rounded bg-zinc-700 px-1.5 py-0.5">1-8</kbd>
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-zinc-900 p-2 border border-zinc-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <NavContent />
      </aside>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="absolute inset-y-0 left-0 w-64 flex flex-col border-r border-zinc-800 bg-zinc-950"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4" aria-label="Close menu">
              <X className="h-5 w-5 text-zinc-400" />
            </button>
            <NavContent />
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}
