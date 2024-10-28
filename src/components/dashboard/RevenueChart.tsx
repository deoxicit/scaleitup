import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const revenueData = Array.from({ length: 12 }, (_, i) => ({
  name: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
  revenue: Math.floor(Math.random() * 50000) + 10000,
  expenses: Math.floor(Math.random() * 30000) + 5000,
}));

export function RevenueChart() {
  return (
    <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Revenue Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#dc2626"
              strokeWidth={2}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
  );
}