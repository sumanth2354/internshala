import React from 'react';
import { BarChart2 } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

const ReportsPage: React.FC = () => {
  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
            Generate and export custom performance reports
          </p>
        </div>

        <div className="card p-8">
          <EmptyState
            icon={<BarChart2 size={48} className="text-primary-400" />}
            title="Reports Module"
            description="Custom reporting features are coming soon."
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
