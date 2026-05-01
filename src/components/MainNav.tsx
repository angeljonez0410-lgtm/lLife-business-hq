import Link from "next/link";
import { LucideHome, LucideListTodo, LucideCalendar, LucideDollarSign, LucideBox, LucideBookOpen, LucideBot, LucideSettings } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LucideHome },
  { href: "/tasks", label: "Tasks", icon: LucideListTodo },
  { href: "/schedule", label: "Schedule", icon: LucideCalendar },
  { href: "/money", label: "Money", icon: LucideDollarSign },
  { href: "/products", label: "Products", icon: LucideBox },
  { href: "/learning", label: "Learning", icon: LucideBookOpen },
  { href: "/ai", label: "Zu AI", icon: LucideBot },
  { href: "/settings", label: "Settings", icon: LucideSettings },
];

export default function MainNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-glass backdrop-blur-xl border-t border-gold/40 py-2 md:hidden">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="flex flex-col items-center text-xs text-black hover:text-pink transition-colors">
          <Icon className="w-6 h-6 mb-1" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
