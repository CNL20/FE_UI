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

// Student and Parent related types
export interface Student {
<<<<<<< HEAD
  id?: number; // Backward compatibility
  studentId?: number;
  student_code?: string;
  studentCode?: string;
=======
  id?: number; // Keep for backward compatibility
  studentId?: number; // New field from backend
  student_code?: string; // Keep for backward compatibility  
  studentCode?: string; // New field from backend
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
  name: string;
  dob: string;
  gender: 'male' | 'female';
  class: string;
  school: string;
  address: string;
  parent_cccd: string;
  blood_type: string;
  height: number;
  weight: number;
  status: 'active' | 'inactive';
  parent?: ParentInfo;
}

export interface ParentInfo {
  id: number;
  account_id: number;
  name: string;
  phone: string;
  cccd: string;
  relationship?: 'father' | 'mother' | 'guardian';
  emergencyContact?: string;
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

// Medical Incident related types
export interface MedicalIncident {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  incidentType: 'injury' | 'illness' | 'emergency' | 'allergy' | 'other';
  description: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  dateTime: Date;
  treatmentGiven: string;
  medicationsUsed: string[];
  additionalNotes: string;
  parentNotified: boolean;
  parentNotificationTime?: Date;
  nurseId: string;
  nurseName: string;
  status: 'active' | 'resolved' | 'follow-up-required';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMedicalIncidentPayload {
  studentId: number;
  incidentType: 'injury' | 'illness' | 'emergency' | 'allergy' | 'other';
  description: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  treatmentGiven: string;
  medicationsUsed: string[];
  additionalNotes: string;
  parentNotified: boolean;
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

// Vaccination related types
export interface VaccinationCampaign {
  id: string;
  name: string;
  description: string;
  vaccineType: string;
  startDate: string;
  endDate: string;
  targetAgeGroup: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface VaccinationConfirmation {
  id: string;
  campaignId: string;
  studentId: string;
  parentId: string;
  confirmationDate: string;
  appointmentDate: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VaccinationConfirmationPayload {
  campaignId: string;
  studentId: string;
  appointmentDate: string;
  notes?: string;
}

// Medicine Inventory types
export interface MedicineItem {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  batchNumber: string;
  manufacturer: string;
  status: 'available' | 'expired' | 'low_stock';
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
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

// Search and Filter types
export interface StudentSearchFilters {
  name?: string;
  class?: string;
  school?: string;
  status?: 'active' | 'inactive';
}

export interface MedicalEventFilters {
  studentId?: string;
  from?: string;
  to?: string;
  eventType?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}