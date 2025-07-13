import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants';
import { HealthCampaign, HealthCheckSchedule, HealthCheckResult, NurseAssignment, HealthCheckAttendance } from '../types/healthCheck';

// Health Campaign APIs
export const getHealthCampaigns = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_CAMPAIGN.BASE);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health campaigns:', error);
    throw error;
  }
};

export const createHealthCampaign = async (campaignData: Omit<HealthCampaign, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    console.log('API gửi đi:', API_ENDPOINTS.HEALTH_CAMPAIGN.BASE);
    console.log('Dữ liệu gửi đi:', JSON.stringify(campaignData));
    
    const response = await apiClient.post(API_ENDPOINTS.HEALTH_CAMPAIGN.BASE, campaignData);
    console.log('API phản hồi:', response.status, response.data);
    return response.data;
  } catch (error: any) {
    console.error('Lỗi tạo chiến dịch khám sức khỏe:', error);
    if (error.response) {
      console.error('Chi tiết lỗi API:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    throw error;
  }
};

export const getHealthCampaignById = async (id: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_CAMPAIGN.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch health campaign with ID ${id}:`, error);
    throw error;
  }
};

// Health Check Schedule APIs
export const getHealthCheckSchedules = async (campaignId: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_CHECK_SCHEDULE.BY_CAMPAIGN(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health check schedules:', error);
    throw error;
  }
};

export const createHealthCheckSchedule = async (scheduleData: Omit<HealthCheckSchedule, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.HEALTH_CHECK_SCHEDULE.BASE, scheduleData);
    return response.data;
  } catch (error) {
    console.error('Failed to create health check schedule:', error);
    throw error;
  }
};

// Nurse Assignment APIs
export const assignNurseToHealthCampaign = async (assignmentData: Omit<NurseAssignment, 'id' | 'assignedAt' | 'status'>) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.NURSE_ASSIGNMENT.BASE, assignmentData);
    return response.data;
  } catch (error) {
    console.error('Failed to assign nurse to health campaign:', error);
    throw error;
  }
};

export const getNurseAssignmentsByCampaign = async (campaignId: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.NURSE_ASSIGNMENT.BY_CAMPAIGN(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch nurse assignments:', error);
    throw error;
  }
};

// Health Check Attendance APIs
export const submitHealthCheckAttendance = async (attendances: HealthCheckAttendance[]) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.ATTENDANCE.BASE, attendances);
    return response.data;
  } catch (error) {
    console.error('Failed to submit health check attendance:', error);
    throw error;
  }
};

export const getStudentsByHealthCampaign = async (campaignId: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_CAMPAIGN.STUDENTS(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students for health campaign:', error);
    throw error;
  }
};

// Health Check Results APIs
export const submitHealthCheckResult = async (resultData: Omit<HealthCheckResult, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.HEALTH_CHECK_RESULT.BASE, resultData);
    return response.data;
  } catch (error) {
    console.error('Failed to submit health check result:', error);
    throw error;
  }
};

export const getHealthCheckResultsByStudent = async (studentId: number, campaignId: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_CHECK_RESULT.BY_STUDENT_CAMPAIGN(studentId, campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch health check results:', error);
    throw error;
  }
};

export const getIncompleteHealthChecks = async (campaignId: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_CHECK_RESULT.INCOMPLETE(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch incomplete health checks:', error);
    throw error;
  }
};

// Notifications
export const sendHealthCheckNotificationToParents = async (campaignId: number) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.HEALTH_CAMPAIGN.NOTIFICATIONS(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to send health check notification to parents:', error);
    throw error;
  }
};

export const sendHealthCheckResultsToParents = async (campaignId: number) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.HEALTH_CAMPAIGN.RESULTS_NOTIFICATION(campaignId));
    return response.data;
  } catch (error) {
    console.error('Failed to send health check results to parents:', error);
    throw error;
  }
};
