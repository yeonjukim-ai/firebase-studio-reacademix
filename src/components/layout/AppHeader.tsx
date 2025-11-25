/**
 * @fileoverview AppHeader 컴포넌트
 * 
 * 역할:
 * - 애플리케이션의 상단 헤더 바 컴포넌트
 * - 검색, 알림, 사용자 프로필 메뉴를 제공
 * - 모바일에서 사이드바 토글 버튼 표시
 * - sticky 포지셔닝으로 스크롤 시에도 상단에 고정
 * 
 * Props 구조:
 * - Props 없음 (자체적으로 필요한 데이터를 관리)
 * 
 * 데이터 흐름:
 * - PlaceHolderImages에서 사용자 아바타 이미지 가져오기
 * - 검색 입력 필드는 현재 상태 관리 없음 (향후 구현 예정)
 * - 사용자 드롭다운 메뉴는 정적 메뉴 항목 표시
 * 
 * 이벤트 흐름:
 * - SidebarTrigger 클릭 → 사이드바 토글 (모바일)
 * - 검색 입력 필드 포커스 → 포커스 링 효과
 * - 알림 버튼 호버 → 스케일 효과 및 펄스 애니메이션
 * - 사용자 아바타 클릭 → 드롭다운 메뉴 열기/닫기
 * - 드롭다운 메뉴 항목 클릭 → 각각의 액션 수행 (현재는 정적)
 * 
 * 사용 예시:
 * ```tsx
 * <AppHeader />
 * ```
 */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AppHeader() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur-md px-4 shadow-sm transition-shadow duration-200 md:px-6">
      <SidebarTrigger className="md:hidden transition-transform duration-200 hover:scale-105" />
      <div className="hidden text-sm text-muted-foreground md:block">
        <span className="font-semibold text-foreground transition-colors duration-200">ReAcademix</span>
        <span className="mx-2 text-muted-foreground/60">/</span>
        <span className="text-muted-foreground">Dashboard</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
          <Input 
            placeholder="학생 또는 리포트 검색..." 
            className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/50" 
          />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95"
        >
          <Bell className="h-5 w-5 transition-transform duration-200 group-hover:animate-pulse" />
          <span className="sr-only">알림</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95"
            >
              <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all duration-200 hover:ring-primary/20">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint}/>}
                <AvatarFallback className="transition-colors duration-200">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>프로필</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>설정</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
