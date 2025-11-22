import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { reportHistory } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function RecentActivityTable() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>
            최근 생성 및 전송된 리포트 목록입니다.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <a href="/dashboard/reports">
                전체 보기
                <ArrowRight className="h-4 w-4" />
            </a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>리포트 명</TableHead>
              <TableHead>대상</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>생성자</TableHead>
              <TableHead>생성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHistory.slice(0, 5).map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.target}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "completed"
                        ? "default"
                        : report.status === "failed"
                        ? "destructive"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>{report.creator}</TableCell>
                <TableCell>{report.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
