import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRole, RegisterPayload } from '../types';
import { STORAGE_KEYS, API_ENDPOINTS } from '../constants';

// Create Axios instance
const apiClient = axios.create({
  baseURL: process.env['REACT_APP_API_BASE_URL'] || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor: attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Try both TOKEN and AUTH_TOKEN for compatibility
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
        localStorage.setItem(STORAGE_KEYS.TOKEN, token); // Sync both keys
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
    // Support both token & access_token naming
    const jwtToken = token || access_token;
    if (jwtToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, jwtToken);
      localStorage.setItem(STORAGE_KEYS.TOKEN, jwtToken);
    }
    if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, userRole || role);
    if (user) localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    // Special nurse logic for nurse_id
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
    // Remove all tokens and user info
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
export const getAllStudents = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.STUDENT.BASE);
    return response.data;
  } catch (error) {
    console.error('Failed to get all students:', error);
    throw error;
  }
};

export const searchStudents = async (query: string) => {
  try {
    const response = await apiClient.get(`/student/search-by-name?name=${encodeURIComponent(query)}`);
    return response;
  } catch (error: any) {
    console.error('Failed to search students:', error.response?.data || error.message);
    throw error;
  }
};

export const getStudentById = async (studentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.STUDENT.BY_ID(studentId));
    return response.data;
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
    // Validate required fields
    if (!data.studentId || data.studentId === 0) throw new Error('Student ID is required');
    if (!data.incidentType) throw new Error('Incident type is required');
    if (!data.description || !data.description.trim()) throw new Error('Description is required');
    if (!data.location || !data.location.trim()) throw new Error('Location is required');
    // Map frontend to backend fields
    const formattedData = {
      studentId: Number(data.studentId),
      eventType: data.incidentType,
      severity: data.severity || 'low',
      location: data.location.trim(),
      description: data.description.trim(),
      symptoms: Array.isArray(data.symptoms) ? data.symptoms.join(', ') : (data.symptoms || ''),
      outcome: data.treatmentGiven || '',
      notes: data.additionalNotes || '',
      usedSupplies: Array.isArray(data.medicationsUsed) ? data.medicationsUsed.join(', ') : (data.medicationsUsed || ''),
      parentNotified: Boolean(data.parentNotified),
      dateTime: new Date().toISOString(),
      status: 'active'
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

export const getMedicalIncidentById = async (id: string) => {
  try {
    const response = await apiClient.get(`/medical-event/${id}`);
    return response.data;
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
      endpoint += `?${params.toString()}`;    }
    
    const response = await apiClient.get(endpoint);
    
    // Handle different response structures
    let incidents = [];
    if (response.data) {
      if (Array.isArray(response.data)) {
        incidents = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        incidents = response.data.data;
      } else if (response.data.events && Array.isArray(response.data.events)) {
        incidents = response.data.events;
      } else {
        incidents = [response.data];
      }
    }

    // Map backend fields to frontend expected format
    const mappedIncidents = incidents.map((incident: any, index: number) => {
      // Smart severity mapping based on eventType if severity not provided
      const inferSeverity = (eventType: string) => {
        switch (eventType?.toLowerCase()) {
          case 'emergency': return 'critical';
          case 'allergy': return 'high';
          case 'injury': return 'medium';
          case 'illness': return 'low';
          default: return 'low';
        }
      };

      const mapped = {
        id: incident.id || incident.eventId || `temp-${index}`,
        studentName: incident.studentName || incident.student?.name || incident.Student?.name || 'Unknown Student',
        className: incident.className || incident.student?.className || incident.Student?.className || 'Unknown Class',
        incidentType: incident.eventType || incident.incidentType || incident.EventType || 'other',
        severity: incident.severity || incident.Severity || inferSeverity(incident.eventType || incident.EventType),
        dateTime: incident.eventDate || incident.dateTime || incident.EventDate || incident.createdAt || new Date().toISOString(),
        description: incident.description || incident.Description || 'No description available',
        location: incident.location || incident.Location || 'Unknown location',
        status: incident.status || incident.Status || 'active',
        parentNotified: incident.parentNotified || incident.ParentNotified || false,
        treatmentGiven: incident.outcome || incident.treatmentGiven || incident.Outcome || '',
        medicationsUsed: incident.usedSupplies ? 
          (typeof incident.usedSupplies === 'string' ? incident.usedSupplies.split(', ') : incident.usedSupplies) : 
          (incident.UsedSupplies ? 
            (typeof incident.UsedSupplies === 'string' ? incident.UsedSupplies.split(', ') : incident.UsedSupplies) : []),
        symptoms: incident.symptoms ? 
          (typeof incident.symptoms === 'string' ? incident.symptoms.split(', ') : incident.symptoms) : 
          (incident.Symptoms ? 
            (typeof incident.Symptoms === 'string' ? incident.Symptoms.split(', ') : incident.Symptoms) : []),
        additionalNotes: incident.notes || incident.additionalNotes || incident.Notes || ''
      };
      
      return mapped;
    });

    return mappedIncidents;
  } catch (error: any) {
    console.error('❌ Failed to get medical incidents:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    
    // Return empty array instead of throwing to prevent UI crash
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