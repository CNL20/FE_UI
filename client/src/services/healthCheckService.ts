// KHÔNG dùng biến môi trường, dùng URL trực tiếp như bạn yêu cầu
const API_URL = "http://localhost:5000";

// Lấy danh sách chiến dịch khám sức khỏe
export const getHealthCheckCampaigns = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/health-check/campaigns`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Không lấy được danh sách chiến dịch!");
  return await res.json();
};

// Tạo mới một chiến dịch khám sức khỏe
export const createHealthCheckCampaign = async (form: { name: string; startDate: string; targetClass: string }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/health-check/campaigns`, {
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
  const res = await fetch(`${API_URL}/api/health-check/campaigns/${campaignId}/results`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Không lấy được kết quả khám!");
  return await res.json();
};

// Bổ nhiệm nhân viên y tế cho chiến dịch
export const assignStaffToCampaign = async (campaignId: number, nurseId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/health-check/campaigns/${campaignId}/assign-staff`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ nurseId }), // Đúng trường nurseId
  });
  if (!res.ok) throw new Error("Bổ nhiệm nhân viên thất bại!");
  // Nếu backend trả về rỗng, chỉ return true
  return true;
};

// Gửi thông báo kết quả khám cho phụ huynh
export const notifyParentsHealthCheck = async (campaignId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/health-check/campaigns/${campaignId}/notify-parents`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gửi thông báo thất bại!");
  return await res.json();
};

// Lấy danh sách nhân viên y tế (dùng cho modal bổ nhiệm)
export const getHealthCheckStaff = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/health-check/school-staff`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Không lấy được danh sách nhân viên!");
  return await res.json();
};