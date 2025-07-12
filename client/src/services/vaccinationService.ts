import {
  VaccinationCampaign,
  VaccinationConsent,
  Nurse,
  VaccinationRecord,
} from "../types/vaccination";
import { API_BASE_URL } from "../constants";

// Lấy token từ localStorage (key đúng là "token" theo dữ liệu bạn gửi)
const getToken = () => localStorage.getItem("token");

// Tạo headers có Authorization nếu có token (dùng cho backend JWT)
const authHeaders = () => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  // DEBUG: Log header khi gửi request
  console.debug("[FE DEBUG] Request headers:", headers);
  return headers;
};

// ==== CHIẾN DỊCH TIÊM CHỦNG ====

// Lấy tất cả chiến dịch tiêm chủng
export const getVaccinationCampaigns = async (): Promise<VaccinationCampaign[]> => {
  console.debug("[FE DEBUG] Fetching all vaccination campaigns");
  const response = await fetch(`${API_BASE_URL}/vaccination/campaigns`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi lấy danh sách chiến dịch:", response.status, errorText);
    throw new Error("Không lấy được danh sách chiến dịch! " + errorText);
  }
  return await response.json();
};

// ==== Y TÁ ====

// Lấy danh sách chiến dịch tiêm chủng mà y tá đăng nhập được bổ nhiệm
export const getAssignedCampaignsForNurse = async (): Promise<any[]> => {
  console.debug("[FE DEBUG] Fetching assigned campaigns for nurse");
  const response = await fetch(
    `${API_BASE_URL}/vaccination/nurse/assigned-campaigns`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi lấy chiến dịch của y tá:", response.status, errorText);
    throw new Error("Không lấy được danh sách chiến dịch của y tá! " + errorText);
  }
  return await response.json();
};

// Tạo mới chiến dịch tiêm chủng
export const createVaccinationCampaign = async (campaign: Partial<VaccinationCampaign>) => {
  if (!campaign.vaccineName || !campaign.scheduleDate) {
    throw new Error("Vui lòng nhập đầy đủ tên vắc xin và ngày dự kiến.");
  }
  let isoScheduleDate = "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(campaign.scheduleDate)) {
    isoScheduleDate = campaign.scheduleDate;
  } else {
    isoScheduleDate = new Date(campaign.scheduleDate).toISOString().slice(0, 10);
  }
  const payload = {
    vaccineName: campaign.vaccineName,
    scheduleDate: isoScheduleDate,
    status: campaign.status ?? "planned",
    description: campaign.description ?? "",
    targetClass: campaign.targetClass ?? "",
  };
  console.debug("[FE DEBUG] Creating campaign with payload:", payload);
  const response = await fetch(`${API_BASE_URL}/vaccination/campaigns`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errText = await response.text();
    console.error("Lỗi tạo chiến dịch tiêm chủng:", response.status, errText);
    throw new Error("Tạo chiến dịch thất bại! " + errText);
  }
  return await response.json();
};

// ==== XÁC NHẬN TIÊM CHỦNG (PHỤ HUYNH) ====

// Lấy danh sách xác nhận tiêm chủng của PHỤ HUYNH đang đăng nhập
export const getParentConsentForms = async (): Promise<VaccinationConsent[]> => {
  console.debug("[FE DEBUG] Fetching parent consent forms");
  const response = await fetch(
    `${API_BASE_URL}/vaccination/parent/consent-forms`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi lấy danh sách xác nhận:", response.status, errorText);
    throw new Error("Không lấy được danh sách xác nhận! " + errorText);
  }
  return await response.json();
};

/**
 * Gửi xác nhận tiêm chủng của phụ huynh (API PUT /vaccination/parent/consent-forms/{consentId})
 * @param consentId: id của phiếu xác nhận (được lấy qua getParentConsentForms)
 * @param consentData: { consentStatus: boolean, notes?: string }
 */
export const sendVaccinationConsent = async (
  consentId: number,
  consentData: { consentStatus: boolean, notes?: string }
) => {
  console.debug("[FE DEBUG] Sending consentId:", consentId, "consentData:", consentData);

  const response = await fetch(`${API_BASE_URL}/vaccination/parent/consent-forms/${consentId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(consentData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi gửi xác nhận tiêm chủng:", response.status, errorText);
    throw new Error("Gửi xác nhận thất bại! " + errorText);
  }
  return await response.json();
};

/**
 * Tạo mới xác nhận tiêm chủng của phụ huynh (API POST /vaccination/parent/consent-forms)
 * @param consentData: { campaignId: number, studentId: number, consentStatus: boolean, notes?: string }
 */
export const createVaccinationConsent = async (
  consentData: {
    campaignId: number;
    studentId: number;
    consentStatus: boolean;
    notes?: string;
  }
) => {
  console.debug("[FE DEBUG] Creating new parent consent:", consentData);

  const response = await fetch(`${API_BASE_URL}/vaccination/parent/consent-forms`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(consentData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi tạo phiếu xác nhận tiêm chủng:", response.status, errorText);
    throw new Error("Tạo phiếu xác nhận thất bại! " + errorText);
  }
  return await response.json();
};

// ==== Y TÁ ====

// Bổ nhiệm y tá cho chiến dịch
export const assignNurseToCampaign = async (
  campaignId: number,
  nurseId: number
) => {
  console.debug("[FE DEBUG] Assigning nurseId:", nurseId, "to campaignId:", campaignId);
  const response = await fetch(
    `${API_BASE_URL}/vaccination/campaigns/${campaignId}/assign-nurse`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ nurseId }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi bổ nhiệm y tá:", response.status, errorText);
    throw new Error("Bổ nhiệm y tá thất bại! " + errorText);
  }
  return await response.json();
};

// Lấy danh sách y tá (giả lập - thay bằng API thật nếu có)
export const getNurses = async (): Promise<Nurse[]> => {
  console.debug("[FE DEBUG] Getting nurse list (mock)");
  // Nếu có API thực tế, thay URL bên dưới
  return [
    { nurseId: 1, name: "Nguyễn Thị A" },
    { nurseId: 2, name: "Trần Văn B" },
  ];
};

// ==== KẾT QUẢ TIÊM CHỦNG & THÔNG BÁO ====

// Lấy kết quả tiêm chủng của một chiến dịch
export const getVaccinationResults = async (
  campaignId: number
): Promise<VaccinationRecord[]> => {
  console.debug("[FE DEBUG] Fetching vaccination results for campaignId:", campaignId);
  const response = await fetch(
    `${API_BASE_URL}/vaccination/campaigns/${campaignId}/results`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi lấy kết quả tiêm chủng:", response.status, errorText);
    throw new Error("Không lấy được kết quả tiêm chủng! " + errorText);
  }
  return await response.json();
};

// Gửi thông báo kết quả tiêm chủng cho phụ huynh
export const notifyParentsVaccination = async (campaignId: number) => {
  console.debug("[FE DEBUG] Notifying parents for campaignId:", campaignId);
  const response = await fetch(
    `${API_BASE_URL}/vaccination/campaigns/${campaignId}/notify-parents`,
    {
      method: "POST",
      headers: authHeaders(),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lỗi gửi thông báo kết quả:", response.status, errorText);
    throw new Error("Gửi thông báo thất bại! " + errorText);
  }
  return await response.json();
};