"use client";

import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";
import { GetWorkflowExecutionsStats } from "@/actions/analytics/getWorkflowExecutionsStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartColumnStackedIcon, Layers2Icon } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>;

const chartConfig = {
  success: {
    label: "Successfull Phases credits",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "Failed Phases Credits",
    color: "hsl(var(--chart-1))",
  },
};

function CreditUsageChart({
  data,
  title,
  description,
}: {
  data: ChartData;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ChartColumnStackedIcon className="w-6 h-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              maxBarSize={40}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={"date"}
                tickLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip
                content={<ChartTooltipContent className="w-[250px]" />}
              />
              <Bar
                fill="var(--color-success)"
                radius={[0, 0, 4, 4]}
                stroke="var(--color-success)"
                fillOpacity={0.8}
                dataKey={"success"}
                stackId={"a"}
              />
              <Bar
                fill="var(--color-failed)"
                radius={[4, 4, 0, 0]}
                stroke="var(--color-failed)"
                fillOpacity={0.8}
                dataKey={"failed"}
                stackId={"a"}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default CreditUsageChart;
