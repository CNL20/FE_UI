import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRole, RegisterPayload } from '../types';
import { STORAGE_KEYS, API_ENDPOINTS, JWT_CONFIG } from '../constants';

const apiClient = axios.create({
  baseURL: process.env['REACT_APP_API_BASE_URL'] || 'https://localhost:5001/api',
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
      // Thêm issuer vào header nếu cần
      config.headers['X-JWT-Issuer'] = JWT_CONFIG.ISSUER;
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

export const googleLogin = async (token: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, { token });
    const { accessToken, refreshToken, user, role } = response.data;
    
    // Lưu thông tin vào localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    console.error('Google login failed:', error);
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

export default apiClient;