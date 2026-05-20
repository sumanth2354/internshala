import React, { useState, useCallback, useMemo } from 'react';
import { Plus, Download, Users, CheckCircle, PhoneCall, Award, XCircle, TrendingUp } from 'lucide-react';
import { toast } from 'react-toastify';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useGetLeads, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import { useDebounce } from '../hooks/useDebounce';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadForm } from '../components/leads/LeadForm';
import { LeadDetailsModal } from '../components/leads/LeadDetailsModal';
import { Pagination } from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { leadsApi } from '../api/leads.api';
import { ILead, ILeadFilters, ILeadFormValues } from '../types';
import { ITEMS_PER_PAGE } from '../utils/constants';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, trendUp }) => (
  <div className="card p-5 group card-hover relative overflow-hidden">
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-600 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-300">
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          <TrendingUp size={12} className={trendUp ? '' : 'rotate-180'} />
          {trend}
        </div>
      )}
    </div>
    <div className="relative z-10">
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
    </div>
    {/* Subtle decorative gradient */}
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-gray-50 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out" />
  </div>
);

const DEFAULT_FILTERS: ILeadFilters = {
  sort: 'latest',
  page: 1,
  limit: ITEMS_PER_PAGE,
};

// Analytics Mock Data
const leadGrowthData = [
  { name: 'Mon', leads: 4 },
  { name: 'Tue', leads: 7 },
  { name: 'Wed', leads: 5 },
  { name: 'Thu', leads: 11 },
  { name: 'Fri', leads: 8 },
  { name: 'Sat', leads: 14 },
  { name: 'Sun', leads: 19 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [filters, setFilters] = useState<ILeadFilters>(DEFAULT_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<ILead | null>(null);
  const [viewingLead, setViewingLead] = useState<ILead | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const effectiveFilters: ILeadFilters = {
    ...filters,
    search: debouncedSearch || undefined,
  };

  const { data, isLoading, isError, refetch } = useGetLeads(effectiveFilters);
  const { mutateAsync: createLead, isPending: isCreating } = useCreateLead();
  const { mutateAsync: updateLead, isPending: isUpdating } = useUpdateLead();
  const { mutateAsync: deleteLead } = useDeleteLead();

  const leads = data?.data?.leads ?? [];
  const pagination = data?.data?.pagination;

  // Fetch a larger set for stats computation
  const statsQuery = useGetLeads({ ...effectiveFilters, limit: 1000, page: 1 });
  const allLeads = statsQuery.data?.data?.leads ?? [];
  const totalLeads = statsQuery.data?.data?.pagination?.total ?? 0;
  
  const stats = useMemo(() => ({
    total: totalLeads,
    new: allLeads.filter((l) => l.status === 'New').length,
    contacted: allLeads.filter((l) => l.status === 'Contacted').length,
    qualified: allLeads.filter((l) => l.status === 'Qualified').length,
    lost: allLeads.filter((l) => l.status === 'Lost').length,
  }), [allLeads, totalLeads]);

  const pieData = useMemo(() => [
    { name: 'New', value: stats.new },
    { name: 'Qualified', value: stats.qualified },
    { name: 'Contacted', value: stats.contacted },
    { name: 'Lost', value: stats.lost },
  ].filter(d => d.value > 0), [stats]);

  const handleFilterChange = useCallback(
    (updates: Partial<ILeadFilters>): void => {
      setFilters((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const handleResetFilters = useCallback((): void => {
    setFilters(DEFAULT_FILTERS);
    setSearchInput('');
  }, []);

  const handleSearchChange = useCallback((value: string): void => {
    setSearchInput(value);
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleFormSubmit = async (formData: ILeadFormValues): Promise<void> => {
    try {
      if (editingLead) {
        await updateLead({ id: editingLead._id, data: formData });
        toast.success('Lead updated successfully!');
      } else {
        await createLead(formData);
        toast.success('Lead created successfully!');
      }
      setIsFormOpen(false);
      setEditingLead(null);
    } catch {
      toast.error(editingLead ? 'Failed to update lead.' : 'Failed to create lead.');
    }
  };

  const handleDelete = async (leadId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(leadId);
      toast.success('Lead deleted successfully!');
    } catch {
      toast.error('Failed to delete lead.');
    }
  };

  const handleExportCsv = async (): Promise<void> => {
    setIsExporting(true);
    try {
      const blob = await leadsApi.exportCsv(effectiveFilters);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `leads_export_${dateStr}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported successfully!');
    } catch {
      toast.error('Failed to export CSV.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full pb-12 animate-fade-in">
      <div className="page-container py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1.5 font-medium">
              Overview of your sales pipeline and recent activity
            </p>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-3">
              <Button
                id="export-csv-btn"
                variant="outline"
                size="sm"
                leftIcon={<Download size={16} />}
                onClick={handleExportCsv}
                isLoading={isExporting}
                className="bg-white shadow-sm hover:bg-gray-50 border-gray-200"
              >
                Export CSV
              </Button>
              <Button
                id="add-lead-btn"
                size="sm"
                leftIcon={<Plus size={16} />}
                onClick={() => {
                  setEditingLead(null);
                  setIsFormOpen(true);
                }}
                className="shadow-sm"
              >
                Add Lead
              </Button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 animate-slide-up">
          <StatCard
            label="Total Leads"
            value={stats.total}
            icon={<Users size={20} />}
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            label="New Leads"
            value={stats.new}
            icon={<CheckCircle size={20} />}
            trend="+5%"
            trendUp={true}
          />
          <StatCard
            label="Qualified"
            value={stats.qualified}
            icon={<Award size={20} />}
            trend="+18%"
            trendUp={true}
          />
          <StatCard
            label="Contacted"
            value={stats.contacted}
            icon={<PhoneCall size={20} />}
          />
          <StatCard
            label="Lost"
            value={stats.lost}
            icon={<XCircle size={20} />}
            trend="-2%"
            trendUp={false}
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {/* Growth Chart */}
          <div className="card p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Lead Growth</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leadGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Conversion Overview</h3>
            <div className="h-72 w-full flex flex-col items-center justify-center relative">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                  <PieChart size={48} className="mb-2 opacity-20" />
                  <p className="text-sm">No data available</p>
                </div>
              )}
              {pieData.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500 font-medium">Total</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leads Table Section */}
        <div className="card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Leads</h3>
            </div>
            
            <LeadFilters
              filters={filters}
              searchValue={searchInput}
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          <LeadTable
            leads={leads}
            isLoading={isLoading}
            isError={isError}
            isAdmin={isAdmin}
            onView={setViewingLead}
            onEdit={(lead) => {
              setEditingLead(lead);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
            onRetry={refetch}
            onReset={handleResetFilters}
          />

          {pagination && (
            <div className="p-4 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
              <Pagination
                pagination={pagination}
                onPageChange={(page) => handleFilterChange({ page })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleFormSubmit}
        lead={editingLead}
        isLoading={isCreating || isUpdating}
      />

      <LeadDetailsModal
        lead={viewingLead}
        isOpen={!!viewingLead}
        onClose={() => setViewingLead(null)}
      />
    </div>
  );
};

export default DashboardPage;
