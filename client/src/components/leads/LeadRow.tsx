import React from 'react';
import { MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import { ILead } from '../../types';
import { Badge } from '../ui/Badge';

interface LeadRowProps {
  lead: ILead;
  isAdmin: boolean;
  onView: (lead: ILead) => void;
  onEdit: (lead: ILead) => void;
  onDelete: (id: string) => void;
}

export const LeadRow: React.FC<LeadRowProps> = ({
  lead,
  isAdmin,
  onView,
  onEdit,
  onDelete,
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'New': return 'info';
      case 'Contacted': return 'warning';
      case 'Qualified': return 'success';
      case 'Lost': return 'danger';
      default: return 'default';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website': return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'Instagram': return 'bg-pink-50 text-pink-700 border-pink-200/60';
      case 'Referral': return 'bg-teal-50 text-teal-700 border-teal-200/60';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <tr className="hover:bg-gray-50/80 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 border border-gray-200/50">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {lead.name}
            </div>
            <div className="text-xs text-gray-500">{lead.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSourceColor(lead.source)}`}>
          {lead.source}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(lead.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onView(lead)}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(lead)}
                className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                title="Edit Lead"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(lead._id)}
                className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                title="Delete Lead"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
          
          {!isAdmin && (
            <button className="p-1.5 text-gray-300 cursor-not-allowed" disabled>
              <MoreHorizontal size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
