"use client";

import * as React from "react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

type ChartProp = {
  category: string;
  spend: number;
  theme: string;
};

type ChartPieDonutTextProps = {
  transactionsByCategory: Record<string, number>;
  budgets: ChartProp[];
};

export function ChartPieDonutText({
  transactionsByCategory,
  budgets,
}: ChartPieDonutTextProps) {
  const totalSpend = (Object.values(transactionsByCategory) as number[]).reduce(
    (a, b) => a + b,
    0
  );

  const chartData = budgets.map((b: ChartProp) => ({
    name: b.category,
    value: b.spend,
    fill: b.theme || "var(--chart-1)",
  }));

  const chartConfig = budgets.reduce((acc, b) => {
    acc[b.category] = {
      label: b.category,
      color: b.theme || "var(--chart-1)",
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="flex flex-col border-none outline-none shadow-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="50%"
                outerRadius="80%"
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            ${totalSpend.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            of $
                            {chartData.reduce(
                              (acc: number, sec: { value: number }) =>
                                acc + sec.value,
                              0
                            )}{" "}
                            limit
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
