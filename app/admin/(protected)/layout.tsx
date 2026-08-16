"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Availability', href: '/admin/availability', icon: Clock },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
];



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border min-h-screen">
        <div className="p-6 border-b border-border">
          <h1 className="font-sora font-semibold text-lg text-foreground">H4Ai Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header (simplified) */}
      <div className="md:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-sora font-semibold text-lg text-foreground">H4Ai Admin</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      {/* Mobile Nav (simplified) */}
      <div className="md:hidden flex overflow-x-auto bg-card border-b border-border p-2">
        {navigation.map((item) => (
           <Link
           key={item.name}
           href={item.href}
           className={cn(
             "flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap",
             pathname === item.href 
               ? "bg-primary text-primary-foreground" 
               : "text-muted-foreground"
           )}
         >
           {item.name}
         </Link>
        ))}
      </div>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
