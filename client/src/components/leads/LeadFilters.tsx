import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ILeadFilters } from '../../types';

interface LeadFiltersProps {
  filters: ILeadFilters;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (updates: Partial<ILeadFilters>) => void;
  onReset: () => void;
}

export const LeadFilters: React.FC<LeadFiltersProps> = ({
  filters,
  searchValue,
  onSearchChange,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters =
    searchValue !== '' ||
    filters.status !== undefined ||
    filters.source !== undefined ||
    filters.sort !== 'latest';

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      {/* Search Bar */}
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus-ring placeholder-gray-400"
        />
      </div>

      {/* Filters Container */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 font-medium">
          <Filter size={14} />
          <span>Filters</span>
        </div>

        <select
          value={filters.status || ''}
          onChange={(e) =>
            onFilterChange({ status: (e.target.value as any) || undefined, page: 1 })
          }
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus-ring cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={filters.source || ''}
          onChange={(e) =>
            onFilterChange({ source: (e.target.value as any) || undefined, page: 1 })
          }
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus-ring cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>

        <select
          value={filters.sort || 'latest'}
          onChange={(e) =>
            onFilterChange({ sort: e.target.value as any, page: 1 })
          }
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus-ring cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={14} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};
