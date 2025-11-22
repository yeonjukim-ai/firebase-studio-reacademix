import { PageHeader } from "@/components/shared/PageHeader";
import { StudentsTable } from "@/components/students/StudentsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function StudentsPage() {
  return (
    <>
      <PageHeader title="학생 관리" description="학원에 등록된 모든 학생의 정보를 관리합니다.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          학생 추가
        </Button>
      </PageHeader>
      <StudentsTable />
    </>
  );
}
