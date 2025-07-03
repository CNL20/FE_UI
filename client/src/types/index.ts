// User related types
export type UserRole = 'admin' | 'manager' | 'nurse' | 'parent';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

// Health Record related types
export interface HealthRecord {
  id: string;
  studentId: string;
  height: number;
  weight: number;
  bloodType: string;
  allergies: string[];
  medicalConditions: string[];
  medications: Medication[];
  vaccinations: Vaccination[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: Date;
  batchNumber: string;
  administeredBy: string;
  nextDueDate?: Date;
}

// Event related types
export interface HealthEvent {
  id: string;
  title: string;
  description: string;
  type: 'checkup' | 'vaccination' | 'emergency';
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  participants: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Appointment related types
export interface Appointment {
  id: string;
  studentId: string;
  eventId: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Notification related types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  recipientId: string;
  isRead: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Form related types
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean;
  };
}

// Auth related types
export interface LoginCredentials {
  username: string;
  password: string;
  role: UserRole;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  cccd: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  role: UserRole;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  role: UserRole | null;
}

// Component Props Types
export interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export interface DashboardProps {
  onLogout: () => void;
}

export interface HomeProps {
  onLogin?: (role: UserRole) => void;
  isAuthenticated?: boolean;
}

export interface ParentDashboardProps extends DashboardProps {}
export interface AdminDashboardProps extends DashboardProps {}
export interface ManagerDashboardProps extends DashboardProps {}
export interface NurseDashboardProps extends DashboardProps {}

export interface HealthProfileFormProps extends DashboardProps {}
export interface MedicationFormProps extends DashboardProps {}
export interface VaccinationEventDashboardProps extends DashboardProps {}
export interface HealthCheckDashboardProps extends DashboardProps {} 

// Health Campaign related types
export interface HealthCampaign {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  targetGrades?: string[];
  totalStudents?: number;
  completedCount?: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  fullName: string;
  grade: string;
  class: string;
  dateOfBirth: Date;
  parentContact: string;
  parentName?: string;
  parentPhone?: string;
}

export interface CampaignStudent {
  id: string;
  campaignId: string;
  studentId: string;
  student: Student;
  attendanceStatus: 'present' | 'absent' | 'pending';
  attendanceTime?: Date;
  checkupCompleted: boolean;
  checkupStatus?: 'completed' | 'in-progress' | 'pending';
}

export interface HealthCheckResult {
  id: string;
  campaignId: string;
  studentId: string;
  height: number;
  weight: number;
  bmi?: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  vision: {
    leftEye: string;
    rightEye: string;
  };
  hearing: string;
  generalHealth: {
    status: 'excellent' | 'good' | 'fair' | 'poor';
    notes?: string;
  };
  dental?: {
    status: 'good' | 'needs-attention' | 'treatment-required';
    notes?: string;
  };
  recommendations?: string[];
  notes?: string;
  nurseId: string;
  createdAt: Date;
}

export interface CampaignNotification {
  id: string;
  campaignId: string;
  recipientId: string;
  type: 'campaign_created' | 'reminder' | 'results_ready';
  sentAt: Date;
  status: 'sent' | 'delivered' | 'read';
}

// Health Campaign Component Props
export interface CampaignCreateProps {
  onLogout?: () => void;
}

export interface CampaignListProps {
  onLogout?: () => void;
}

export interface StudentAssignProps {
  onLogout?: () => void;
  campaignId: string;
}

export interface NurseAssignProps {
  onLogout?: () => void;
  campaignId: string;
}

export interface AttendanceProps {
  onLogout?: () => void;
  campaignId: string;
}

export interface HealthCheckFormProps {
  onLogout?: () => void;
  campaignId: string;
  studentId: string;
}

export interface ResultsReportProps {
  onLogout?: () => void;
  campaignId: string;
}