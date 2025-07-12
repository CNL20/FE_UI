// Enum cho trạng thái chiến dịch
export type CampaignStatus = "draft" | "active" | "finished" | "cancelled";

// Enum cho trạng thái phiếu xác nhận
export type ConsentStatus = "pending" | "agreed" | "declined";

// Enum cho trạng thái tiêm chủng
export type VaccinationStatus = "Done" | "Pending" | "Absent";

// Enum cho loại thông báo
export type NotificationType = "system" | "vaccination" | "result" | "custom";

// Chiến dịch tiêm chủng
export interface VaccinationCampaign {
  campaignId: number;
  vaccineName: string;
  scheduleDate: string; // ISO string
  description?: string;
  targetClass: string;
  status: CampaignStatus;
}

// Học sinh
export interface Student {
  studentId: number;
  name: string;
  class: string;
  parentId: number;
  // Có thể bổ sung thêm các trường khác nếu cần
}

// Phụ huynh
export interface Parent {
  parentId: number;
  accountId: number;
  name: string;
  // Có thể bổ sung thêm các trường khác nếu cần
}

// Phiếu xác nhận tiêm chủng gửi cho phụ huynh
export interface VaccinationConsent {
  consentId: number;
  campaignId: number;
  studentId: number;
  parentId: number;
  vaccineName: string;
  consentStatus: ConsentStatus; // "pending", "agreed", "declined"
  consentDate: string; // ISO string
  notes?: string | null;
  class?: string;
  student?: Student;
  parent?: Parent;
}

// Y tá
export interface Nurse {
  nurseId: number;
  name: string;
  // Có thể bổ sung thêm các trường khác nếu cần
}

// Ghi nhận tiêm chủng của học sinh
export interface VaccinationRecord {
  vaccinationId: number;
  studentId: number;
  campaignId: number;
  vaccineName: string;
  dateOfVaccination: string; // ISO string
  status: VaccinationStatus; // "Done", "Pending", "Absent"
  administeredBy: number; // nurseId
  student?: Student; // <-- Thêm dòng này để fix lỗi thiếu 'student'
}

// Bổ nhiệm y tá cho chiến dịch
export interface VaccinationAssignment {
  assignmentId?: number;
  campaignId: number;
  nurseId: number;
  assignedDate?: string; // ISO string
}

// Thông báo hệ thống gửi cho user
export interface UserNotification {
  notificationId?: number;
  recipientId: number; // userId (parent, nurse, manager)
  title: string;
  message: string;
  createdAt: string; // ISO string
  isRead: boolean;
  type: NotificationType;
}

// Điểm danh học sinh trong ngày tiêm
export interface AttendanceItem {
  studentId: number;
  nurseId: number;
  present: boolean;
}