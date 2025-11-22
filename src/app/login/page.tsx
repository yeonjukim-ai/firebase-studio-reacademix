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

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                 <svg
                    className="h-10 w-10 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM11 11H4.93L9 8.61V11H11ZM13 11V8.61L19.07 11H13ZM11 13V15.39L4.93 13H11ZM13 13H19.07L13 15.39V13Z" />
                </svg>
            </div>
          <CardTitle className="text-2xl font-headline">ReAcademix</CardTitle>
          <CardDescription>
            계속하려면 이메일과 비밀번호를 입력하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/dashboard">로그인</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
