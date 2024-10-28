import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Plus, MoreVertical, Mail, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock employee data - replace with your actual data source
const mockEmployees = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    walletAddress: "0x1234...5678",
    email: "john@example.com",
    status: "Active",
    paymentSchedule: "Monthly",
    salary: "$5,000 PYUSD",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    walletAddress: "0x8765...4321",
    email: "jane@example.com",
    status: "Active",
    paymentSchedule: "Bi-weekly",
    salary: "$6,000 PYUSD",
  },
  // Add more mock employees as needed
];

export function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <Button
          onClick={() => setShowAddEmployee(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$11,000 PYUSD</div>
            <p className="text-xs text-muted-foreground">
              Next payment in 15 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,500 PYUSD</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Employee Directory</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Schedule</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmployees
                .filter(
                  (employee) =>
                    employee.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    employee.role
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell className="font-mono">
                      {employee.walletAddress}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell>{employee.paymentSchedule}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Wallet className="mr-2 h-4 w-4" />
                            Send Payment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddEmployeeDialog
        open={showAddEmployee}
        onOpenChange={setShowAddEmployee}
      />
    </div>
  );
}

function AddEmployeeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input placeholder="Software Engineer" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Address</label>
            <Input placeholder="0x..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salary (PYUSD)</label>
            <Input type="number" placeholder="5000" />
          </div>
          <div className="pt-4">
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Add Employee
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
