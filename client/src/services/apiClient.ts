import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRole, RegisterPayload } from '../types';
import { STORAGE_KEYS, API_ENDPOINTS } from '../constants';

const apiClient = axios.create({
  baseURL: process.env['REACT_APP_API_BASE_URL'] || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Quan trọng cho CORS với credentials
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Thử refresh token
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          `${apiClient.defaults.baseURL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken }
        );

        const { token } = response.data;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

        // Thử lại request ban đầu với token mới
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, logout user
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth services
export const login = async (
  username: string,
  password: string,
  role: UserRole
) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      username,
      password,
      role,
    });
    
    // Xử lý response từ backend
    const { token, refreshToken, user, role: userRole } = response.data;
    
    // Lưu thông tin vào localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, userRole);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    
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

// Health Records services
export const getHealthRecords = async (studentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_RECORDS.STUDENT(studentId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health records:', error);
    throw error;
  }
};

// Events services
export const getUpcomingEvents = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.UPCOMING);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error);
    throw error;
  }
};

// Appointments services
export const getStudentAppointments = async (studentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.STUDENT(studentId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};

// Notifications services
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
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Student services
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
  console.log('Searching students by name:', query);
  
  try {
    // Sử dụng endpoint GET /api/student/search-by-name?name=...
    const response = await apiClient.get(`/student/search-by-name?name=${encodeURIComponent(query)}`);
    console.log('Search response:', response);
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

// Medical Event services - Cập nhật theo backend API
export const getStudentMedicalInfo = async (studentId: string) => {
  console.log('Getting student medical info for ID:', studentId);
  
  try {
    // Sử dụng endpoint GET /api/medical-event/student/{studentId}
    const response = await apiClient.get(`/medical-event/student/${studentId}`);
    console.log('Student medical info response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get student medical info:', error.response?.data || error.message);
    throw error;
  }
};

export const createMedicalIncident = async (data: any) => {
  console.log('Creating medical incident - Input data:', data);
  
  try {
    // Validate required fields
    if (!data.studentId || data.studentId === 0) {
      throw new Error('Student ID is required');
    }
    
    if (!data.incidentType) {
      throw new Error('Incident type is required');
    }
    
    if (!data.description || !data.description.trim()) {
      throw new Error('Description is required');
    }
    
    if (!data.location || !data.location.trim()) {
      throw new Error('Location is required');
    }    // Format data according to backend MedicalEvent model
    // Map frontend fields to exact backend field names
    const formattedData = {
      studentId: Number(data.studentId),     // -> student_id
      eventType: data.incidentType,          // -> event_type
      severity: data.severity || 'low',      
      location: data.location.trim(),
      description: data.description.trim(),  // -> description
      symptoms: Array.isArray(data.symptoms) ? data.symptoms.join(', ') : (data.symptoms || ''),      outcome: data.treatmentGiven || '',    // treatmentGiven -> outcome (kết quả điều trị)
      notes: data.additionalNotes || '',     // additionalNotes -> notes (ghi chú thêm)  
      usedSupplies: Array.isArray(data.medicationsUsed) ? data.medicationsUsed.join(', ') : (data.medicationsUsed || ''), // medicationsUsed -> usedSupplies (thuốc/vật tư)
      // handledBy sẽ được backend tự động gán từ AccountId của y tá đang đăng nhập
      parentNotified: Boolean(data.parentNotified),
      dateTime: new Date().toISOString(), // Add current timestamp
      status: 'active' // Default status
    };    console.log('Formatted data for backend:', JSON.stringify(formattedData, null, 2));
    console.log('Request URL:', '/medical-event');
    console.log('Full request details:', {
      url: '/medical-event',
      method: 'POST',
      data: formattedData,
      headers: { 'Content-Type': 'application/json' }
    });    // Log individual field mapping
    console.log('Field mapping validation:');
    console.log('- Frontend treatmentGiven:', data.treatmentGiven, '-> Backend outcome:', formattedData.outcome);
    console.log('- Frontend additionalNotes:', data.additionalNotes, '-> Backend notes:', formattedData.notes);
    console.log('- Frontend medicationsUsed:', data.medicationsUsed, '-> Backend usedSupplies:', formattedData.usedSupplies);
    console.log('- handledBy will be automatically assigned by backend from logged-in nurse AccountId');
    
    // Sử dụng endpoint POST /api/medical-event
    const response = await apiClient.post('/medical-event', formattedData);
    console.log('Create medical incident response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create medical incident:', error);
    console.error('Error response data:', error.response?.data);
    console.error('Error response status:', error.response?.status);
    console.error('Error response headers:', error.response?.headers);
    
    // Log chi tiết validation errors
    if (error.response?.data?.errors) {
      console.error('Validation errors detail:', error.response.data.errors);
      Object.keys(error.response.data.errors).forEach(key => {
        console.error(`Field "${key}":`, error.response.data.errors[key]);
      });
    }
    
    throw error;
  }
};

export const getMedicalIncidentById = async (id: string) => {
  console.log('Getting medical incident by ID:', id);
  
  try {
    // Sử dụng endpoint GET /api/medical-event/{id}
    const response = await apiClient.get(`/medical-event/${id}`);
    console.log('Medical incident by ID response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get medical incident:', error.response?.data || error.message);
    throw error;
  }
};

export const getMedicalIncidents = async (filters?: Record<string, string>) => {
  console.log('Getting medical incidents with filters:', filters);
  
  try {
    // Sử dụng endpoint GET /api/medical-event với query params
    let endpoint = '/medical-event';
    
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      endpoint += `?${params.toString()}`;
    }
    
    console.log(`Getting medical incidents from: ${endpoint}`);
    const response = await apiClient.get(endpoint);
    console.log('Get medical incidents response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get medical incidents:', error.response?.data || error.message);
    throw error;
  }
};

export const notifyParent = async (incidentId: string, notificationData: any) => {
  console.log('Notifying parent for incident:', incidentId, notificationData);
  
  try {
    // Sử dụng endpoint POST /api/medical-event/{id}/notify (nếu có)
    // Hoặc có thể là một API riêng cho notification
    const response = await apiClient.post(`/medical-event/${incidentId}/notify`, notificationData);
    console.log('Notify parent response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Failed to notify parent:', error.response?.data || error.message);
    throw error;
  }
};

// Vaccination services
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

// Parent services
export const getParentById = async (parentId: string) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PARENT.BY_ID(parentId));
    return response.data;
  } catch (error) {
    console.error('Failed to get parent info:', error);
    throw error;
  }
};

// Medicine Inventory services
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