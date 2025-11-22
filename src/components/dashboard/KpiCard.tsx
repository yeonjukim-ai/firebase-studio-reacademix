import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function KpiCard({ title, value, change, changeType }: Kpi) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {changeType === 'increase' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground",
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          )}
        >
          {change} vs last month
        </p>
      </CardContent>
    </Card>
  );
}
