/**
 * @fileoverview StudentSearchBar 컴포넌트
 * 
 * 역할:
 * - 학생 검색 입력 필드를 제공하는 컴포넌트
 * - 검색어 입력 시 부모 컴포넌트로 콜백을 통해 전달
 * 
 * Props:
 * - searchTerm: 현재 검색어
 * - onSearchChange: 검색어 변경 시 호출되는 콜백
 */

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StudentSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function StudentSearchBar({ searchTerm, onSearchChange }: StudentSearchBarProps) {
  return (
    <div className="relative flex-1 w-full sm:w-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
      <Input
        placeholder="학생 이름, 반, ID로 검색..."
        className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
