import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="환경설정"
        description="시스템 및 알림 설정을 관리합니다."
      />
      <Tabs defaultValue="notifications">
        <TabsList>
            <TabsTrigger value="notifications">알림 설정</TabsTrigger>
            <TabsTrigger value="account">계정 설정</TabsTrigger>
            <TabsTrigger value="system">시스템</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>발신자 정보 설정</CardTitle>
                        <CardDescription>이메일 및 SMS 발신에 사용될 정보를 설정합니다.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="sender-email">발신 이메일 주소</Label>
                            <Input id="sender-email" placeholder="noreply@reacademix.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sender-name">발신자 이름</Label>
                            <Input id="sender-name" placeholder="ReAcademix 관리자" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sender-sms">발신 SMS 번호</Label>
                            <Input id="sender-sms" placeholder="010-1234-5678" />
                        </div>
                         <Button className="w-fit">저장</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>알림 템플릿 관리</CardTitle>
                        <CardDescription>리포트 발송 시 사용될 템플릿을 수정합니다.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email-template">이메일 템플릿</Label>
                            <Textarea id="email-template" rows={5} defaultValue="[학생이름]님의 [리포트이름]이 도착했습니다. 아래 링크에서 확인하세요." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sms-template">SMS 템플릿</Label>
                             <Textarea id="sms-template" rows={3} defaultValue="[ReAcademix] [학생이름]님의 [리포트이름] 도착. 확인: [링크]" />
                        </div>
                        <div className="flex gap-2">
                            <Button className="w-fit">저장</Button>
                            <Button variant="outline" className="w-fit">테스트 발송</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
         <TabsContent value="account" className="mt-6">
            <Card>
                 <CardHeader>
                    <CardTitle>계정 정보</CardTitle>
                    <CardDescription>개인 정보를 수정하고 비밀번호를 변경할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>계정 설정 폼이 여기에 표시됩니다.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="system" className="mt-6">
            <Card>
                 <CardHeader>
                    <CardTitle>시스템 설정</CardTitle>
                    <CardDescription>어플리케이션의 일반 설정을 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>시스템 설정 폼이 여기에 표시됩니다.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
