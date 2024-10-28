import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/dashboard/RevenueChart"; // Adjust the import path as necessary

import { LucideIcon } from "lucide-react";

const DashboardMetric = ({
  title,
  value,
  trend,
  icon: Icon,
}: {
  title: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
}) => (
  <div className="flex items-center space-x-2">
    <div className="p-2 bg-primary/10 rounded">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      {trend && (
        <p
          className={`text-xs ${trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}
        >
          {trend}
        </p>
      )}
    </div>
  </div>
);

const BusinessMetrics = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card className="p-4">
      <DashboardMetric
        title="Monthly Revenue"
        value="$45,231"
        trend="+20.1% vs last month"
        icon={DollarSign}
      />
    </Card>
    <Card className="p-4">
      <DashboardMetric
        title="Active Employees"
        value="12"
        trend="+2 this month"
        icon={Users}
      />
    </Card>
    <Card className="p-4">
      <DashboardMetric
        title="Cash Flow"
        value="$12,400"
        trend="-5.2% vs last month"
        icon={Activity}
      />
    </Card>
  </div>
);

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Business Overview
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Last updated:</span>
            <span className="text-sm font-medium">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>

        <BusinessMetrics />

        <div className="grid gap-6 md:grid-cols-2">
          <RevenueChart />
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                onClick={() => alert("Initiating payroll...")}
              >
                Run Payroll
              </Button>
              <Button className="w-full" variant="outline">
                Generate Reports
              </Button>
              <Button className="w-full" variant="outline">
                Manage Employees
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
