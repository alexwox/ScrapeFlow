"use client";

import { GetWorkflowExecutionsStats } from "@/actions/analytics/getWorkflowExecutionsStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers2Icon } from "lucide-react";
import React from "react";

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionsStats>>;

function ExecutionStatusChart({ data }: { data: ChartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Layers2Icon className="w-6 h-6 text-primary" />
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily number of successfull and failed workflow executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </CardContent>
    </Card>
  );
}

export default ExecutionStatusChart;
