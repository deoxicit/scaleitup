import { create } from 'zustand';
import { BusinessProfile, Employee } from '@/types/business';

interface BusinessState {
  profile: BusinessProfile | null;
  employees: Employee[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setProfile: (profile: BusinessProfile) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  removeEmployee: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  profile: null,
  employees: [],
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),
  
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
  
  updateEmployee: (id, data) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...data } : emp
      ),
    })),
  
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));