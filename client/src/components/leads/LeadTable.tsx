import React from 'react';
import { ILead } from '../../types';
import { LeadRow } from './LeadRow';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';
import { Database, AlertCircle } from 'lucide-react';

interface LeadTableProps {
  leads: ILead[];
  isLoading: boolean;
  isError: boolean;
  isAdmin: boolean;
  onView: (lead: ILead) => void;
  onEdit: (lead: ILead) => void;
  onDelete: (id: string) => void;
  onRetry: () => void;
  onReset: () => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  isLoading,
  isError,
  isAdmin,
  onView,
  onEdit,
  onDelete,
  onRetry,
  onReset,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-64 flex items-center justify-center">
        <EmptyState
          icon={<AlertCircle size={48} className="text-red-400" />}
          title="Failed to load leads"
          description="There was an error communicating with the server."
          action={{ label: "Try Again", onClick: onRetry }}
        />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <EmptyState
          icon={<Database size={48} className="text-gray-300" />}
          title="No leads found"
          description="Try adjusting your filters or search query."
          action={{ label: "Clear Filters", onClick: onReset }}
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
          <tr>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Lead details
            </th>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {leads.map((lead) => (
            <LeadRow
              key={lead._id}
              lead={lead}
              isAdmin={isAdmin}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
