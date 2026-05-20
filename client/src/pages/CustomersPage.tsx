import React from 'react';

interface DemoCustomer {
  id: string;
  name: string;
  email: string;
  company: string;
  totalSpent: string;
  activeContracts: number;
  status: 'Active' | 'Inactive';
}

const DEMO_CUSTOMERS: DemoCustomer[] = [
  { id: '1', name: 'Stark Industries', email: 'billing@stark.com', company: 'Stark Industries', totalSpent: '$240,000', activeContracts: 3, status: 'Active' },
  { id: '2', name: 'Wayne Enterprises', email: 'accounts@wayne.tech', company: 'Wayne Enterprises', totalSpent: '$180,000', activeContracts: 2, status: 'Active' },
  { id: '3', name: 'Cyberdyne Systems', email: 'admin@cyberdyne.com', company: 'Cyberdyne Systems', totalSpent: '$85,000', activeContracts: 1, status: 'Inactive' },
  { id: '4', name: 'Umbrella Corp', email: 'hr@umbrella.com', company: 'Umbrella Corp', totalSpent: '$110,000', activeContracts: 2, status: 'Active' },
];

const CustomersPage: React.FC = () => {
  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Customer Accounts
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
              Manage your key accounts and customer contracts
            </p>
          </div>
          <span className="bg-primary-50 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-semibold">
            Demo Data Enabled
          </span>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
              <thead className="bg-gray-50/80 dark:bg-gray-900/50 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Value</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contracts</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-white/5">
                {DEMO_CUSTOMERS.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm font-semibold text-primary-700 dark:text-primary-400">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{customer.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {customer.activeContracts} active
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        customer.status === 'Active' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
