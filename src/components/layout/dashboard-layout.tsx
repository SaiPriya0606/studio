"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Orbit, 
  LayoutDashboard, 
  Camera, 
  MessageSquare, 
  Globe, 
  FileText, 
  Layers, 
  History,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Image Captioning", icon: Camera, href: "/dashboard/captioning" },
  { name: "Visual Q&A", icon: MessageSquare, href: "/dashboard/vqa" },
  { name: "ISRO EO Analysis", icon: Globe, href: "/dashboard/eo-analysis" },
  { name: "Land Cover", icon: Layers, href: "/dashboard/land-cover" },
  { name: "Change Detection", icon: History, href: "/dashboard/change-detection" },
  { name: "Report Generator", icon: FileText, href: "/dashboard/reports" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar className="border-r border-border bg-card">
          <SidebarHeader className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <Orbit className="h-6 w-6 text-secondary" />
              <span className="font-headline font-bold text-lg tracking-tighter text-primary">VisionaryGPT</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className={cn(
                      "transition-colors",
                      pathname === item.href ? "bg-secondary text-white hover:bg-secondary/90 hover:text-white" : "hover:bg-muted"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t mt-auto">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">JD</div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">EO Specialist</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col overflow-hidden bg-background">
          <header className="h-16 border-b flex items-center px-6 bg-white shrink-0">
            <SidebarTrigger />
            <div className="ml-4 font-headline font-semibold text-lg">
              {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}