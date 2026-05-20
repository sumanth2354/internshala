export const API_BASE_URL = 'https://smart-leads-backend-89lw.onrender.com/api';

export const TOKEN_KEY = 'smart_leads_token';
export const THEME_KEY = 'smart_leads_theme';

export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'] as const;
export const LEAD_SOURCES = ['Website', 'Instagram', 'Referral'] as const;
export const USER_ROLES = ['admin', 'sales'] as const;

export const ITEMS_PER_PAGE = 10;
export const DEBOUNCE_DELAY_MS = 500;

export const STATUS_BADGE_CLASSES: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Qualified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
} as const;
