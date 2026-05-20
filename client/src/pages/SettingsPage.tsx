import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { toast } from 'react-toastify';

const SettingsPage: React.FC = () => {
  const [name, setName] = useState('Workspace Manager');
  const [email, setEmail] = useState('manager@workspace.com');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Workspace settings updated successfully!');
  };

  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
            Configure your account preferences and system settings
          </p>
        </div>

        <div className="max-w-2xl card p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">
              Profile Configuration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Workspace Owner Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus-ring dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Primary Contact Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus-ring dark:text-white" 
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Email Notifications</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Receive digests and lead status summaries weekly.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="h-4.5 w-4.5 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-white/10 rounded cursor-pointer" 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/10">
              <Button type="submit" size="sm">Save Configuration</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
