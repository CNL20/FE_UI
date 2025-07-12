// API endpoints
export const API_BASE_URL = process.env['REACT_APP_API_BASE_URL'] || 'https://localhost:5001/api';

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  CLIENT_ID: process.env['REACT_APP_GOOGLE_CLIENT_ID'] || '365950590865-aevmgc7ia4s9b7avl4cuaao6fp5tahct.apps.googleusercontent.com',
  REDIRECT_URI: process.env['REACT_APP_GOOGLE_REDIRECT_URI'] || 'https://localhost:5001/signin-google'
};

// Environment Configuration
export const ENV_CONFIG = {
  ENVIRONMENT: process.env['REACT_APP_ENVIRONMENT'] || 'development',
  DEBUG: process.env['REACT_APP_DEBUG'] === 'true'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    CHECK: '/auth/check',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  STUDENT: {
    BASE: '/student',
    SEARCH_BY_NAME: (name: string) => `/student/search-by-name?name=${encodeURIComponent(name)}`,
    BY_ID: (id: string) => `/student/${id}`,
  },
  MEDICAL_EVENT: {
    BASE: '/medical-event',
    CREATE: '/medical-event',
    LIST: '/medical-event',
    BY_ID: (id: string) => `/medical-event/${id}`,
    STUDENT: (studentId: string) => `/medical-event/student/${studentId}`,
    WITH_FILTERS: (filters: Record<string, string>) => {
      const params = new URLSearchParams(filters);
      return `/medical-event?${params.toString()}`;
    },
  },
  VACCINATION: {
    CAMPAIGNS: '/vaccination/campaigns',
    CAMPAIGN_SCHEDULE: (id: number | string) => `/vaccination/campaigns/${id}/schedule`,
    CAMPAIGN_CONFIRMATIONS: (id: string) => `/vaccination/campaigns/${id}/confirmations`,
    CONFIRMATIONS: '/vaccination/confirmations',
  },
  PARENT: {
    BY_ID: (id: string) => `/parent/${id}`,
  },
  MEDICINE_INVENTORY: {
    BASE: '/medicine-inventory',
  },
  // Legacy endpoints for backward compatibility
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
  HEALTH_RECORDS: {
    BASE: '/health-records',
    STUDENT: (studentId: string) => `/health-records/student/${studentId}`,
  },
  EVENTS: {
    BASE: '/events',
    UPCOMING: '/events/upcoming',
    PAST: '/events/past',
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    STUDENT: (studentId: string) => `/appointments/student/${studentId}`,
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    MARK_AS_READ: (id: string) => `/notifications/${id}/read`,
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    DASHBOARD: '/admin',
    MANAGE_ACCOUNTS: '/admin/manage-accounts',
    ACTIVITY_LOGS: '/admin/activity-logs',
  },
  MANAGER: {
    DASHBOARD: '/manager',
    HEALTH_RECORDS: '/manager/health-records',
    MEDICAL_STAFF: '/manager/medical-staff-management',
    ALERTS: '/manager/alerts-and-notifications',
    EVENTS: '/manager/event-and-appointment-management',
    VACCINATION_CAMPAIGNS: '/manager/vaccination-campaigns',
  },
  NURSE: {
    DASHBOARD: '/nurse',
  },
  PARENT: {
    DASHBOARD: '/parent',
    HEALTH_PROFILE: '/parent-pages/health-profile-form',
    MEDICATION: '/parent-pages/medication-form',
    HEALTH_CHECK: {
      DASHBOARD: '/parent-pages/health-check-dashboard',
      SCHEDULE: '/parent-pages/health-check-schedule',
      REGISTRATION: '/parent-pages/health-check-registration-form',
      RESULTS: '/parent-pages/health-check-results',
    },
    VACCINATION: {
      DASHBOARD: '/parent-pages/vaccination-event-dashboard',
      SCHEDULE: '/parent-pages/vaccination-schedule',
      REGISTRATION: '/parent-pages/vaccination-registration-form',
      NEWS: '/parent-pages/vaccination-news',
    },
    NOTIFICATION: '/parent/notification',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ROLE: 'user_role',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  TOKEN: 'token',
};

export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    MESSAGE: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  },
  EMAIL: {
    PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    MESSAGE: 'Invalid email address',
  },
  PHONE: {
    PATTERN: /^\+?[1-9]\d{1,14}$/,
    MESSAGE: 'Invalid phone number',
  },
};

export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'dd/MM/yyyy HH:mm',
  TIME: 'HH:mm',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const EVENT_TYPES = {
  CHECKUP: 'checkup',
  VACCINATION: 'vaccination',
  EMERGENCY: 'emergency',
} as const;

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show',
} as const;