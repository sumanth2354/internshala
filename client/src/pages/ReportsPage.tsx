import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';

interface DemoReport {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}

const DEMO_REPORTS: DemoReport[] = [
  { id: '1', title: 'Q1 Sales Performance Report', type: 'PDF Document', date: 'May 15, 2026', size: '2.4 MB' },
  { id: '2', title: 'Lead Generation Breakdown - May 2026', type: 'Excel Spreadsheet', date: 'May 10, 2026', size: '1.8 MB' },
  { id: '3', title: 'Annual Pipeline Velocity Audit', type: 'PDF Document', date: 'Jan 05, 2026', size: '4.1 MB' },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Executive Reports
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
              Download and generate detailed analytics reports
            </p>
          </div>
          <span className="bg-primary-50 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-semibold">
            Demo Data Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Reports</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Scheduled Runs</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">Every Monday</p>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Last Audit Run</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">Today at 08:30 AM</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Reports</h3>
          <div className="space-y-4">
            {DEMO_REPORTS.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-primary-600 dark:text-primary-400 border border-gray-200/50 dark:border-white/10">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{report.title}</h4>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                      <span>{report.size}</span>
                      <span className="text-primary-600 dark:text-primary-400 font-medium">{report.type}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-sm transition-all">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
