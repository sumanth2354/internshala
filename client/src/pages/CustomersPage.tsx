import React from 'react';
import { Briefcase } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

const CustomersPage: React.FC = () => {
  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Customers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
            View and manage your converted customers
          </p>
        </div>

        <div className="card p-8">
          <EmptyState
            icon={<Briefcase size={48} className="text-primary-400" />}
            title="Customers Module"
            description="Customer management features are coming soon."
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
