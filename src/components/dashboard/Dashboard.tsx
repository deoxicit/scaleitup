import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp 
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    label: string;
  };
}

const MetricCard = ({ title, value, icon: Icon, trend }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground">
          <span className={trend.value >= 0 ? 'text-green-500' : 'text-red-500'}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>{' '}
          {trend.label}
        </p>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend={{ value: 20.1, label: "from last month" }}
        />
        <MetricCard
          title="Active Employees"
          value="12"
          icon={Users}
        />
        <MetricCard
          title="Pending Invoices"
          value="7"
          icon={FileText}
          trend={{ value: -4, label: "from last week" }}
        />
        <MetricCard
          title="Monthly Expenses"
          value="$12,234.00"
          icon={TrendingUp}
          trend={{ value: 8.2, label: "from last month" }}
        />
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};

export default Dashboard;