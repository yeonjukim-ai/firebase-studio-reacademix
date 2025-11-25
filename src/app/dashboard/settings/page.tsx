import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gridSettings, formGap, inputGroup, inputLabel, buttonGroup } from "@/lib/utils/styles";
import { cn } from "@/lib/utils";

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
            <div className={cn(gridSettings)}>
                <SectionCard
                    title="발신자 정보 설정"
                    description="이메일 및 SMS 발신에 사용될 정보를 설정합니다."
                    contentClassName={formGap}
                >
                    <div className={inputGroup}>
                        <Label htmlFor="sender-email" className={inputLabel}>발신 이메일 주소</Label>
                        <Input 
                            id="sender-email" 
                            placeholder="noreply@reacademix.com"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div className={inputGroup}>
                        <Label htmlFor="sender-name" className={inputLabel}>발신자 이름</Label>
                        <Input 
                            id="sender-name" 
                            placeholder="ReAcademix 관리자"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div className={inputGroup}>
                        <Label htmlFor="sender-sms" className={inputLabel}>발신 SMS 번호</Label>
                        <Input 
                            id="sender-sms" 
                            placeholder="010-1234-5678"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <Button className="w-fit transition-all duration-200 hover:scale-105 active:scale-95">
                        저장
                    </Button>
                </SectionCard>
                <SectionCard
                    title="알림 템플릿 관리"
                    description="리포트 발송 시 사용될 템플릿을 수정합니다."
                    contentClassName={formGap}
                >
                    <div className={inputGroup}>
                        <Label htmlFor="email-template" className={inputLabel}>이메일 템플릿</Label>
                        <Textarea 
                            id="email-template" 
                            rows={5} 
                            defaultValue="[학생이름]님의 [리포트이름]이 도착했습니다. 아래 링크에서 확인하세요."
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                    </div>
                    <div className={inputGroup}>
                        <Label htmlFor="sms-template" className={inputLabel}>SMS 템플릿</Label>
                        <Textarea 
                            id="sms-template" 
                            rows={3} 
                            defaultValue="[ReAcademix] [학생이름]님의 [리포트이름] 도착. 확인: [링크]"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                    </div>
                    <div className={buttonGroup}>
                        <Button className="transition-all duration-200 hover:scale-105 active:scale-95">
                            저장
                        </Button>
                        <Button variant="outline" className="transition-all duration-200 hover:scale-105 active:scale-95">
                            테스트 발송
                        </Button>
                    </div>
                </SectionCard>
            </div>
        </TabsContent>
        <TabsContent value="account" className="mt-6">
            <SectionCard
                title="계정 정보"
                description="개인 정보를 수정하고 비밀번호를 변경할 수 있습니다."
            >
                <p>계정 설정 폼이 여기에 표시됩니다.</p>
            </SectionCard>
        </TabsContent>
        <TabsContent value="system" className="mt-6">
            <SectionCard
                title="시스템 설정"
                description="어플리케이션의 일반 설정을 관리합니다."
            >
                <p>시스템 설정 폼이 여기에 표시됩니다.</p>
            </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
