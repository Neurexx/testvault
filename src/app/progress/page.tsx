"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent,ChartConfig,ChartContainer } from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import axios from "axios";

// Fetch progress data from API
async function fetchStudentProgress(studentId:any) {
  const response = await axios.post('/api/progress/aggrvdays',{studentId}); // Adjust the endpoint as per your API
  
  console.log(response.data)
  return response.data;
}

export default function StudentProgressChart() {
  const [progressData, setProgressData] = useState([]);
  const {data:session,status}=useSession()
  useEffect(() => {
    // Fetch progress data when component mounts
    if(status=="loading")
        return
    const getProgressData = async () => {
        //@ts-ignore
      const data = await fetchStudentProgress(session?.user._id);
      setProgressData(data);
    };

    getProgressData();
  }, [status]);
 const chartConfig = {
  averageScore: {
    label: "Average Score",
    color: "hsl(var(--chart-1))",
  },
  averageTimeSpent: {
    label: "Average Time Spent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


  return (
    
    <><Card>
    <CardHeader>
      <CardTitle>Student Progress Over Time</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
      <LineChart
          accessibilityLayer
          data={progressData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="averageScore"
            type="linear"
            stroke="var(--color-averageScore)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="averageTimeSpent"
            type="linear"
            stroke="var(--color-averageTimeSpent)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card></>
  );
}
