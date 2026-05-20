import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart2, 
  Settings, 
  PieChart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: ROUTES.DASHBOARD },
    { name: 'Leads', icon: <Users size={18} />, path: '/leads' },
    { name: 'Customers', icon: <Briefcase size={18} />, path: '/customers' },
    { name: 'Reports', icon: <BarChart2 size={18} />, path: '/reports' },
    { name: 'Analytics', icon: <PieChart size={18} />, path: '/analytics' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  return (
    <aside 
      className={`
        bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative
        ${isOpen ? 'w-64' : 'w-20'}
        hidden lg:flex
      `}
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-200 justify-between">
        <div className={`flex items-center gap-3 overflow-hidden ${!isOpen && 'justify-center w-full'}`}>
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 shadow-sm">
            <PieChart size={18} className="text-white" />
          </div>
          {isOpen && (
            <span className="font-bold text-gray-900 text-lg whitespace-nowrap tracking-tight">
              SmartLeads
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:shadow-sm transition-all z-40"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        <div className="px-3 mb-2">
          {isOpen && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>}
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 group
              ${isActive || item.path === ROUTES.DASHBOARD 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              ${!isOpen && 'justify-center'}
            `}
          >
            <div className={`${!isOpen && 'group-hover:scale-110 transition-transform'}`}>
              {item.icon}
            </div>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 ${!isOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
            <span className="text-gray-600 font-bold text-xs">SL</span>
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">SmartLeads Pro</p>
              <p className="text-xs text-gray-500 truncate">Workspace</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
