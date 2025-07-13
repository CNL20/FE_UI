export interface HealthCampaign {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface HealthCheckSchedule {
  id: number;
  campaignId: number;
  date: string;
  location: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface HealthCheckResult {
  id: number;
  studentId: number;
  campaignId: number;
  scheduleId: number;
  height: number;
  weight: number;
  eyesight: string;
  teeth: string;
  bloodPressure: string;
  heartRate: number;
  additionalNotes: string;
  status: 'completed' | 'incomplete';
  createdAt: string;
  updatedAt: string;
}

export interface HealthCheckAttendance {
  id?: number;
  studentId: number;
  nurseId: number;
  campaignId: number;
  scheduleId: number;
  present: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NurseAssignment {
  id: number;
  nurseId: number;
  nurseName: string;
  campaignId: number;
  assignedAt: string;
  status: 'assigned' | 'active' | 'completed';
}

export interface HealthCheckStudent {
  studentId: number;
  studentCode: string;
  name: string;
  class: string;
  school: string;
  parentName?: string;
  parentId?: number;
  parentPhone?: string;
  status: 'pending' | 'completed' | 'absent';
}
