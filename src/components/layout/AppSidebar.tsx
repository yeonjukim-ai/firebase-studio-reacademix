"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Database,
  FileText,
  LayoutDashboard,
  Settings,
  UsersRound,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/dashboard/students", label: "학생 관리", icon: UsersRound },
  { href: "/dashboard/reports", label: "리포트 관리", icon: FileText },
  { href: "/dashboard/data", label: "데이터 연동", icon: Database },
  { href: "/dashboard/settings", label: "환경설정", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
           <svg
              className="h-8 w-8 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM11 11H4.93L9 8.61V11H11ZM13 11V8.61L19.07 11H13ZM11 13V15.39L4.93 13H11ZM13 13H19.07L13 15.39V13Z" />
            </svg>
          <h2 className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
            ReAcademix
          </h2>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
              tooltip={{ children: item.label }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: '로그아웃' }}>
              <Link href="/login">
                <LogOut />
                <span>로그아웃</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
