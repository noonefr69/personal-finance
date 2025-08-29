"use client"; // 👈 اضافه کن بالای فایل

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getBudgetsAction } from "@/actions/handleBudget";

export const description = "A donut chart with text";

export function ChartPieDonutText({ transactionsByCategory, budgets }: any) {
  const totalSpend = Object.values(transactionsByCategory).reduce(
    (a, b) => a + b,
    0
  );

  const chartData = budgets.map((b: any) => ({
    name: b.category,
    value: b.spend,
    fill: b.theme || "var(--chart-1)",
  }));

  return (
    <Card className="flex flex-col border-none outline-none shadow-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartData}
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
                            {chartData.reduce((acc, sec) => acc + sec.value, 0)}{" "}
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
