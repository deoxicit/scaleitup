import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Receipt,
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  Building2,
  Car,
  Laptop,
  Clock,
  FileText,
  Download,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mockExpenses = [
  {
    id: "EXP-001",
    description: "Office Rent",
    category: "Rent",
    amount: 2500,
    date: "2024-10-15",
    status: "paid",
    payee: "WeWork",
  },
  {
    id: "EXP-002",
    description: "Travel Expenses",
    category: "Travel",
    amount: 850,
    date: "2024-10-18",
    status: "pending",
    payee: "John Doe",
  },
  {
    id: "EXP-003",
    description: "Software Licenses",
    category: "Software",
    amount: 1200,
    date: "2024-10-20",
    status: "paid",
    payee: "Microsoft",
  },
];

const categoryIcons: Record<string, React.ComponentType<any>> = {
  Rent: Building2,
  Travel: Car,
  Software: Laptop,
};

const categories = [
  "Rent",
  "Travel",
  "Software",
  "Office Supplies",
  "Utilities",
  "Marketing",
  "Other",
];

export function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  const totalExpenses = mockExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  const paidExpenses = mockExpenses
    .filter((exp) => exp.status === "paid")
    .reduce((acc, exp) => acc + exp.amount, 0);
  const pendingExpenses = mockExpenses
    .filter((exp) => exp.status === "pending")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const filteredExpenses = mockExpenses.filter(
    (expense) =>
      (expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.payee.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCategory || expense.category === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
        <Button
          onClick={() => setShowNewExpense(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <Receipt className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpenses.toLocaleString()} PYUSD
            </div>
            <p className="text-xs text-muted-foreground">
              {mockExpenses.length} expenses this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${paidExpenses.toLocaleString()} PYUSD
            </div>
            <p className="text-xs text-muted-foreground">
              {mockExpenses.filter((exp) => exp.status === "paid").length}{" "}
              transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingExpenses.toLocaleString()} PYUSD
            </div>
            <p className="text-xs text-muted-foreground">
              {mockExpenses.filter((exp) => exp.status === "pending").length}{" "}
              pending approvals
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Expense History</CardTitle>
            <div className="flex space-x-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => {
                const CategoryIcon =
                  categoryIcons[
                    expense.category as keyof typeof categoryIcons
                  ] || Receipt;
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4" />
                        {expense.category}
                      </div>
                    </TableCell>
                    <TableCell>
                      ${expense.amount.toLocaleString()} PYUSD
                    </TableCell>
                    <TableCell>{expense.payee}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          expense.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {expense.status.charAt(0).toUpperCase() +
                          expense.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddExpenseDialog
        open={showNewExpense}
        onOpenChange={setShowNewExpense}
      />
    </div>
  );
}
function AddExpenseDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    payee: "",
    date: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Office supplies"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (PYUSD)</label>
            <Input
              type="number"
              placeholder="100"
              value={formData.amount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, amount: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Payee</label>
            <Input
              placeholder="Vendor name"
              value={formData.payee}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, payee: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>
          <div className="pt-4">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={
                !formData.category || !formData.description || !formData.amount
              }
            >
              Add Expense
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
