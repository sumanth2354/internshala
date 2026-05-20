import React from 'react';
import { Mail, Tag, Globe, Calendar, User } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ILead, IUser } from '../../types';

interface LeadDetailsModalProps {
  lead: ILead | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
    <div className="mt-0.5 text-primary-500 dark:text-primary-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">
        {label}
      </p>
      <p className="text-sm text-gray-900 dark:text-white font-medium mt-0.5">
        {value}
      </p>
    </div>
  </div>
);

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  lead,
  isOpen,
  onClose,
}) => {
  if (!lead) return null;

  const creatorName =
    typeof lead.createdBy === 'object'
      ? (lead.createdBy as IUser).name
      : 'Unknown';

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

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
    <Modal isOpen={isOpen} onClose={onClose} title="Lead Details" size="md">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {lead.name}
            </h3>
            <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3">
          <DetailItem
            icon={<Mail size={16} />}
            label="Email Address"
            value={lead.email}
          />
          <DetailItem
            icon={<Tag size={16} />}
            label="Status"
            value={lead.status}
          />
          <DetailItem
            icon={<Globe size={16} />}
            label="Lead Source"
            value={lead.source}
          />
          <DetailItem
            icon={<User size={16} />}
            label="Created By"
            value={creatorName}
          />
          <DetailItem
            icon={<Calendar size={16} />}
            label="Created At"
            value={formatDate(lead.createdAt)}
          />
          <DetailItem
            icon={<Calendar size={16} />}
            label="Last Updated"
            value={formatDate(lead.updatedAt)}
          />
        </div>
      </div>
    </Modal>
  );
};
