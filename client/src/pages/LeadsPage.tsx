import React from 'react';
import { Badge } from '../components/ui/Badge';

interface DemoLead {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  company: string;
  value: string;
}

const DEMO_LEADS: DemoLead[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'New', source: 'Website', company: 'Acme Corp', value: '$5,000' },
  { id: '2', name: 'Sarah Connor', email: 'sarah@skynet.com', status: 'Qualified', source: 'Referral', company: 'Cyberdyne', value: '$12,500' },
  { id: '3', name: 'Bruce Wayne', email: 'bruce@wayne.tech', status: 'Contacted', source: 'Instagram', company: 'Wayne Enterprises', value: '$25,000' },
  { id: '4', name: 'Peter Parker', email: 'peter@dailybugle.com', status: 'Lost', source: 'Website', company: 'Daily Bugle', value: '$1,200' },
  { id: '5', name: 'Tony Stark', email: 'tony@stark.com', status: 'Qualified', source: 'Referral', company: 'Stark Industries', value: '$50,000' },
];

const LeadsPage: React.FC = () => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'New': return 'info';
      case 'Contacted': return 'warning';
      case 'Qualified': return 'success';
      case 'Lost': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Leads Pipeline
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
              A comprehensive overview of your sales prospects
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
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lead details</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estimated Value</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-white/5">
                {DEMO_LEADS.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-white/10">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {lead.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {lead.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10">
                        {lead.source}
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

export default LeadsPage;
