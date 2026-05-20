import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const PIPELINE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const SOURCE_REVENUE = [
  { name: 'Website', revenue: 45000 },
  { name: 'Instagram', revenue: 32000 },
  { name: 'Referral', revenue: 68000 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Sales Analytics
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
              Analyze your sales performance and revenue metrics
            </p>
          </div>
          <span className="bg-primary-50 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-semibold">
            Demo Data Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Over Time Line Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Growth</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PIPELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue By Source Bar Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue by Lead Source</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SOURCE_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
