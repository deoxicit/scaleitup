export interface BusinessProfile {
    id: string;
    name: string;
    wallet: `0x${string}`;
    employeeCount: number;
    businessType: 'sole_proprietorship' | 'llc' | 'corporation';
    payrollEnabled: boolean;
    kycStatus: 'pending' | 'verified' | 'rejected';
  }
  
  export interface Employee {
    id: string;
    wallet: `0x${string}`;
    name: string;
    role: string;
    salary: {
      amount: number;
      token: string;
    };
    paymentFrequency: 'weekly' | 'biweekly' | 'monthly';
    startDate: Date;
  }
  