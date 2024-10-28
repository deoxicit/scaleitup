import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  DownloadCloud, 
  Plus, 
  Search, 
  MoreVertical, 
  Send,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type InvoiceStatus = 'paid' | 'pending' | 'overdue';

const mockInvoices: { id: string; client: string; amount: number; status: InvoiceStatus; dueDate: string; issuedDate: string; }[] = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    amount: 5000,
    status: 'paid',
    dueDate: '2024-11-15',
    issuedDate: '2024-10-15',
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    amount: 3500,
    status: 'pending',
    dueDate: '2024-11-20',
    issuedDate: '2024-10-20',
  },
  {
    id: 'INV-003',
    client: 'Global Solutions',
    amount: 7500,
    status: 'overdue',
    dueDate: '2024-10-25',
    issuedDate: '2024-09-25',
  },
];

const statusStyles = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  overdue: 'bg-red-100 text-red-700',
};

const statusIcons = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
};


export function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  const totalPaid = mockInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.amount, 0);

  const totalPending = mockInvoices
    .filter(inv => inv.status === 'pending')
    .reduce((acc, inv) => acc + inv.amount, 0);

  const totalOverdue = mockInvoices
    .filter(inv => inv.status === 'overdue')
    .reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <Button onClick={() => setShowNewInvoice(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()} PYUSD</div>
            <p className="text-xs text-muted-foreground">
              {mockInvoices.filter(inv => inv.status === 'paid').length} invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()} PYUSD</div>
            <p className="text-xs text-muted-foreground">
              {mockInvoices.filter(inv => inv.status === 'pending').length} invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOverdue.toLocaleString()} PYUSD</div>
            <p className="text-xs text-muted-foreground">
              {mockInvoices.filter(inv => inv.status === 'overdue').length} invoices
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Invoices</CardTitle>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
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
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices
                .filter(invoice => 
                  invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((invoice: { id: string; client: string; amount: number; status: 'paid' | 'pending' | 'overdue'; dueDate: string; issuedDate: string; }) => {
                  const StatusIcon = statusIcons[invoice.status];
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>${invoice.amount.toLocaleString()} PYUSD</TableCell>
                      <TableCell>
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                          statusStyles[invoice.status]
                        )}>
                          <StatusIcon className="h-3 w-3" />
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{invoice.issuedDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Send className="mr-2 h-4 w-4" />
                              Send Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <DownloadCloud className="mr-2 h-4 w-4" />
                              Download PDF
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

      <NewInvoiceDialog open={showNewInvoice} onOpenChange={setShowNewInvoice} />
    </div>
  );
}

function NewInvoiceDialog({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Client Name</label>
            <Input placeholder="Acme Corp" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (PYUSD)</label>
            <Input type="number" placeholder="1000" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input placeholder="Invoice description" />
          </div>
          <div className="pt-4">
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Create Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}