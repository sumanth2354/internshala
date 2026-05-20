import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ILead, ILeadFormValues } from '../../types';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../utils/constants';

const leadFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILeadFormValues) => Promise<void>;
  lead?: ILead | null;
  isLoading: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lead,
  isLoading,
}) => {
  const isEditing = !!lead;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: lead
      ? {
          name: lead.name,
          email: lead.email,
          status: lead.status,
          source: lead.source,
        }
      : {
          status: 'New',
          source: 'Website',
        },
  });

  const handleClose = (): void => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: ILeadFormValues): Promise<void> => {
    await onSubmit(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Lead' : 'Add New Lead'}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-4">
        <Input
          id="lead-name"
          label="Full Name"
          placeholder="e.g. John Doe"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          id="lead-email"
          label="Email Address"
          type="email"
          placeholder="e.g. john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="lead-status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <select
            id="lead-status"
            {...register('status')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="lead-source"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Source
          </label>
          <select
            id="lead-source"
            {...register('source')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.source && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.source.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            id="lead-form-submit-btn"
            type="submit"
            isLoading={isLoading}
          >
            {isEditing ? 'Save Changes' : 'Create Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
