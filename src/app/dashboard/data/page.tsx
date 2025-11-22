import { DataManagementClient } from "@/components/data/DataManagementClient";
import { PageHeader } from "@/components/shared/PageHeader";

export default function DataPage() {
  return (
    <>
      <PageHeader
        title="데이터 관리"
        description="학생 데이터 파일을 업로드하고, AI를 통해 데이터 유효성을 검사하며, 오류를 수정합니다."
      />
      <DataManagementClient />
    </>
  );
}
