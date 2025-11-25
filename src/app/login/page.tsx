import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { heading2, bodySmall, formGap, inputGroup, inputLabel, cardBase } from '@/lib/utils/styles';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 md:p-6">
      <Card className={cn(cardBase, "mx-auto w-full max-w-sm shadow-soft transition-all duration-200 hover:shadow-emphasis")}>
        <CardHeader className="text-center pb-6">
            <div className="flex justify-center items-center mb-4 md:mb-6">
                 <svg
                    className="h-10 w-10 md:h-12 md:w-12 text-primary transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM11 11H4.93L9 8.61V11H11ZM13 11V8.61L19.07 11H13ZM11 13V15.39L4.93 13H11ZM13 13H19.07L13 15.39V13Z" />
                </svg>
            </div>
          <CardTitle className={cn(heading2, "text-2xl md:text-3xl mb-2")}>ReAcademix</CardTitle>
          <CardDescription className={cn(bodySmall, "text-sm md:text-base")}>
            계속하려면 이메일과 비밀번호를 입력하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={formGap}>
            <div className={inputGroup}>
              <Label htmlFor="email" className={inputLabel}>이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className={inputGroup}>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={inputLabel}>비밀번호</Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline transition-colors duration-200"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full transition-all duration-200 hover:scale-105 active:scale-95" 
              asChild
            >
              <Link href="/dashboard">로그인</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
