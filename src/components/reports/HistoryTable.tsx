"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Send } from "lucide-react";

type HistoryItem = {
  id: string;
  name: string;
  target: string;
  status: "completed" | "failed" | "in_progress" | "sent";
  creator?: string;
  recipient?: string;
  channel?: "Email" | "SMS";
  date: string;
};

type HistoryTableProps = {
  data: any[];
  type: "generation" | "transmission";
};

export function HistoryTable({ data, type }: HistoryTableProps) {
  const isGeneration = type === "generation";

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isGeneration ? "리포트 명" : "리포트 명"}</TableHead>
            <TableHead>{isGeneration ? "대상" : "수신자"}</TableHead>
            <TableHead>{isGeneration ? "생성자" : "채널"}</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>{isGeneration ? "생성일" : "전송일"}</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {isGeneration ? item.name : item.reportName}
              </TableCell>
              <TableCell>{isGeneration ? item.target : item.recipient}</TableCell>
              <TableCell>{isGeneration ? item.creator : item.channel}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "completed" || item.status === "sent"
                      ? "default"
                      : item.status === "failed"
                      ? "destructive"
                      : "secondary"
                  }
                  className={
                    item.status === "completed" || item.status === "sent"
                    ? 'bg-blue-100 text-blue-800'
                    : ''
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{isGeneration ? item.createdAt : item.sentAt}</TableCell>
              <TableCell className="text-right">
                {isGeneration && item.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                )}
                {!isGeneration && item.status === 'sent' && (
                   <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    재전송
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
