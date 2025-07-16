import { API_BASE_URL } from "../constants";

// Lấy danh sách chiến dịch khám sức khỏe
export const getHealthCheckCampaigns = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/health-check/campaigns`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Không lấy được danh sách chiến dịch!");
  return await res.json();
};

// Tạo mới một chiến dịch khám sức khỏe
export const createHealthCheckCampaign = async (form: { name: string; startDate: string; targetClass: string }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/health-check/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(form),
  });
  if (!res.ok) throw new Error("Tạo chiến dịch mới thất bại!");
  return await res.json();
};

// Lấy kết quả khám sức khỏe theo campaign
export const getHealthCheckResults = async (campaignId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/health-check/campaigns/${campaignId}/results`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Không lấy được kết quả khám!");
  return await res.json();
};

// Bổ nhiệm nhân viên y tế cho chiến dịch
export const assignStaffToCampaign = async (campaignId: number, nurseId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/health-check/campaigns/${campaignId}/assign-staff`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ nurseId }),
  });
  if (!res.ok) throw new Error("Bổ nhiệm nhân viên thất bại!");
  return true;
};

// Gửi thông báo kết quả khám cho phụ huynh (gửi cho tất cả học sinh trong campaign)
export const notifyParentsHealthCheck = async (campaignId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/health-check/campaigns/${campaignId}/notify-parents`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gửi thông báo thất bại!");
  return await res.json();
};

// Gửi thông báo nguy cấp cho phụ huynh của 1 học sinh
export const notifyCriticalForStudent = async (studentId: number) => {
  const token = localStorage.getItem("token");
  // SỬA route đúng theo backend: notification/critical-notify thay vì health-check/critical-notify
  const res = await fetch(`${API_BASE_URL}/notification/critical-notify/${studentId}`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gửi thông báo nguy cấp thất bại!");
  // Nếu backend trả về rỗng, chỉ return true
  try {
    return await res.json();
  } catch {
    return true;
  }
};

// Lấy danh sách nhân viên y tế (dùng cho modal bổ nhiệm)
export const getHealthCheckStaff = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/health-check/school-staff`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Không lấy được danh sách nhân viên!");
  return await res.json();
};