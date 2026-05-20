import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Bell, Search, Plus, Menu } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onMenuClick?: () => void;
  onAddLead?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onAddLead }) => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-900 p-1 -ml-1 rounded-md"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Placeholder */}
        <div className="hidden md:flex items-center w-full max-w-md relative group">
          <Search size={16} className="absolute left-3 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="Search leads, customers, or reports..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-sm focus-ring placeholder-gray-400"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <kbd className="hidden sm:inline-block border border-gray-200 rounded px-1.5 text-[10px] font-medium text-gray-400 bg-white">⌘K</kbd>
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

        <button className="relative p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

        <div className="flex items-center gap-3 group">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize leading-tight mt-0.5">
              {user?.role || 'sales'}
            </p>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white cursor-pointer group-hover:ring-primary-100 transition-all">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {/* Simple Dropdown placeholder - we can just use the logout button here for now */}
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors sm:ml-2"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};
