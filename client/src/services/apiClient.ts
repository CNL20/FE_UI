import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRole, RegisterPayload } from '../types';
import { STORAGE_KEYS, API_ENDPOINTS } from '../constants';

// SỬ DỤNG ENV ĐỂ LẤY BASE URL, KHÔNG GHI CỨNG
const apiClient = axios.create({
  baseURL: process.env['REACT_APP_API_BASE_URL'],
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor: attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN) || localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor: auto refresh token for 401 errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token available');
        const response = await axios.post(
          `${apiClient.defaults.baseURL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken }
        );
        const { token } = response.data;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem('nurse_id');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// ================== AUTH SERVICES ==================
export const login = async (
  username: string,
  password: string,
  role: UserRole
) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { username, password, role });
    const { token, refreshToken, user, role: userRole, access_token } = response.data;
    const jwtToken = token || access_token;
    if (jwtToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, jwtToken);
      localStorage.setItem(STORAGE_KEYS.TOKEN, jwtToken);
    }
    if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, userRole || role);
    if (user) localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    if ((userRole || role) === 'nurse' && user && user.nurse_id) {
      localStorage.setItem('nurse_id', user.nurse_id);
    } else {
      localStorage.removeItem('nurse_id');
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.CHECK);
    return response.data;
  } catch (error) {
    console.error('Auth check failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem('nurse_id');
  }
};

export const register = async (data: RegisterPayload) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// ================== HEALTH CHECK CAMPAIGNS (FOR NURSE) ==================
export const getNurseHealthCheckCampaigns = async (nurseId: string | number) => {
  try {
    const response = await apiClient.get(`/health-check/nurse/campaigns?nurseId=${nurseId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get nurse health check campaigns:', error);
    throw error;
  }
};

// ================== HEALTH RECORDS ==================
export const getHealthRecords = async (studentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_RECORDS.STUDENT(studentId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health records:', error);
    throw error;
  }
};

// ================== EVENTS ==================
export const getUpcomingEvents = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.UPCOMING);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error);
    throw error;
  }
};

// ================== APPOINTMENTS ==================
export const getStudentAppointments = async (studentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.STUDENT(studentId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};

// ================== NOTIFICATIONS ==================
export const getNotifications = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.BASE);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(notificationId));
    return response.data;
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    throw error;
  }
};

// ================== HEALTH CHECK REGISTRATION ==================
export interface HealthCheckRegistration {
  parentName: string;
  studentName: string;
  class: string;
  healthCheckRound: string;
  reason: string;
}

export const registerHealthCheck = async (data: HealthCheckRegistration) => {
  return apiClient.post('/health-check/register', data);
};

export const submitHealthProfile = async (formData: FormData) => {
  return apiClient.post('/health-profile/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// ================== STUDENT SERVICES ==================
const mapStudent = (s: any) => ({
  id: s.student_id ?? s.id,
  studentId: s.student_id ?? s.id,
  student_code: s.student_code,
  studentCode: s.student_code,
  name: s.name,
  dob: s.dob,
  gender: s.gender,
  class: s.class,
  school: s.school,
  address: s.address,
  parent_cccd: s.parent_cccd,
  blood_type: s.blood_type,
  height: s.height,
  weight: s.weight,
  status: s.status,
  parent: s.parent ? {
    id: s.parent.id,
    account_id: s.parent.account_id,
    name: s.parent.name,
    phone: s.parent.phone,
    cccd: s.parent.cccd,
    relationship: s.parent.relationship,
    emergencyContact: s.parent.emergency_contact,
  } : undefined,
  parent_name: s.parent_name,
  parent_phone: s.parent_phone,
});

export const getAllStudents = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.STUDENT.BASE);
    if (Array.isArray(response.data)) {
      return response.data.map(mapStudent);
    } else if (response.data) {
      return [mapStudent(response.data)];
    }
    return [];
  } catch (error) {
    console.error('Failed to get all students:', error);
    throw error;
  }
};

export const searchStudents = async (query: string) => {
  try {
    const response = await apiClient.get(`/student/search-by-name?name=${encodeURIComponent(query)}`);
    if (Array.isArray(response.data)) {
      return { data: response.data.map(mapStudent) };
    } else if (response.data) {
      return { data: [mapStudent(response.data)] };
    }
    return { data: [] };
  } catch (error: any) {
    console.error('Failed to search students:', error.response?.data || error.message);
    throw error;
  }
};

export const getStudentById = async (studentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.STUDENT.BY_ID(studentId));
    return mapStudent(response.data);
  } catch (error) {
    console.error('Failed to get student:', error);
    throw error;
  }
};

// ================== MEDICAL EVENTS ==================
export const getStudentMedicalInfo = async (studentId: string) => {
  try {
    const response = await apiClient.get(`/medical-event/student/${studentId}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get student medical info:', error.response?.data || error.message);
    throw error;
  }
};

export const createMedicalIncident = async (data: any) => {
  try {
    if (!data.studentId || data.studentId === 0) throw new Error('Student ID is required');
    if (!data.incidentType) throw new Error('Incident type is required');
    if (!data.description || !data.description.trim()) throw new Error('Description is required');
    if (!data.location || !data.location.trim()) throw new Error('Location is required');
    const formattedData = {
      StudentId: Number(data.studentId),
      EventType: data.incidentType,
      Severity: data.severity || 'low',
      Location: data.location.trim(),
      Description: data.description.trim(),
      Symptoms: Array.isArray(data.symptoms) ? data.symptoms.join(', ') : (data.symptoms || ''),
      Outcome: data.treatmentGiven || '',
      Notes: data.additionalNotes || '',
      UsedSupplies: Array.isArray(data.medicationsUsed) ? data.medicationsUsed.join(', ') : (data.medicationsUsed || ''),
      ParentNotified: Boolean(data.parentNotified),
      DateTime: new Date().toISOString(),
      Status: 'active'
    };
    const response = await apiClient.post('/medical-event', formattedData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.errors) {
      Object.keys(error.response.data.errors).forEach(key => {
        console.error(`Field "${key}":`, error.response.data.errors[key]);
      });
    }
    throw error;
  }
};

const mapMedicalIncident = (item: any) => ({
  id: item.id || item.eventId || '',
  studentId: item.student_id || item.studentId || '',
  studentName: item.student_name || item.studentName || 'N/A',
  className: item.class_name || item.className || 'N/A',
  incidentType: item.event_type || item.incidentType || 'other',
  description: item.description || '',
  symptoms: item.symptoms ? item.symptoms.split(',').map((s: string) => s.trim()) : [],
  severity: item.severity || 'low',
  location: item.location || '',
  dateTime: item.date_time || item.dateTime || '',
  treatmentGiven: item.outcome || '',
  medicationsUsed: item.used_supplies ? item.used_supplies.split(',').map((s: string) => s.trim()) : [],
  additionalNotes: item.notes || '',
  parentNotified: item.parent_notified || false,
  parentNotificationTime: item.parent_notification_time || '',
  nurseId: item.nurse_id || '',
  nurseName: item.nurse_name || '',
  status: item.status || 'active',
  createdAt: item.created_at || '',
  updatedAt: item.updated_at || '',
});

export const getMedicalIncidentById = async (id: string) => {
  try {
    const response = await apiClient.get(`/medical-event/${id}`);
    return mapMedicalIncident(response.data);
  } catch (error: any) {
    console.error('Failed to get medical incident:', error.response?.data || error.message);
    throw error;
  }
};

export const getMedicalIncidents = async (filters?: Record<string, string>) => {
  try {
    let endpoint = '/medical-event';
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      endpoint += `?${params.toString()}`;
    }
    const response = await apiClient.get(endpoint);
    if (Array.isArray(response.data)) {
      return response.data.map(mapMedicalIncident);
    } else if (response.data) {
      return [mapMedicalIncident(response.data)];
    }
    return [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const notifyParent = async (incidentId: string, notificationData: any) => {
  try {
    const response = await apiClient.post(`/medical-event/${incidentId}/notify`, notificationData);
    return response.data;
  } catch (error: any) {
    console.error('Failed to notify parent:', error.response?.data || error.message);
    throw error;
  }
};

// ================== VACCINATION SERVICES ==================
export const getVaccinationCampaigns = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.VACCINATION.CAMPAIGNS);
    return response.data;
  } catch (error) {
    console.error('Failed to get vaccination campaigns:', error);
    throw error;
  }
};

export const getCampaignConfirmations = async (campaignId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.VACCINATION.CAMPAIGN_CONFIRMATIONS(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to get campaign confirmations:', error);
    throw error;
  }
};

export const submitVaccinationConfirmation = async (data: any) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.VACCINATION.CONFIRMATIONS, data);
    return response.data;
  } catch (error) {
    console.error('Failed to submit vaccination confirmation:', error);
    throw error;
  }
};

// ================== PARENT ==================
export const getParentById = async (parentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PARENT.BY_ID(parentId));
    return response.data;
  } catch (error) {
    console.error('Failed to get parent info:', error);
    throw error;
  }
};

// ================== MEDICINE INVENTORY ==================
export const getMedicineInventory = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.MEDICINE_INVENTORY.BASE);
    return response.data;
  } catch (error) {
    console.error('Failed to get medicine inventory:', error);
    throw error;
  }
};

export default apiClient;