import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, Bell, Search, Plus, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onMenuClick?: () => void;
  onAddLead?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onAddLead }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/leads?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="h-16 bg-white dark:bg-white/5 dark:backdrop-blur-xl border-b border-gray-200 dark:border-white/10 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 -ml-1 rounded-md"
        >
          <Menu size={20} />
        </button>

        {/* Global Search */}
        <div className="hidden md:flex items-center w-full max-w-md relative group">
          <Search size={16} className="absolute left-3 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Search leads (Press Enter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm focus-ring placeholder-gray-400 dark:text-white"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <kbd className="hidden sm:inline-block border border-gray-200 dark:border-white/20 rounded px-1.5 text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-white dark:bg-transparent">↵</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {isAdmin && onAddLead && (
          <Button
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={onAddLead}
            className="hidden sm:flex shadow-sm"
          >
            New Lead
          </Button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden z-50 animate-fade-in">
              <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</h3>
                <span className="text-xs text-primary-600 dark:text-primary-400 cursor-pointer">Mark all read</span>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">System Update</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dashboard features have been upgraded successfully.</p>
                  <p className="text-[10px] text-gray-400 mt-2">Just now</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>

        <div className="flex items-center gap-3 group">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize leading-tight mt-0.5">
              {user?.role || 'sales'}
            </p>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white dark:ring-gray-900 cursor-pointer group-hover:ring-primary-100 transition-all">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors sm:ml-2"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};
