import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  getParentConsentForms,
  sendVaccinationConsent,
} from "../../services/vaccinationService";

// Interface đúng với frontend
interface ConsentForm {
  consentId: number;
  vaccineName: string;
  studentName: string;
  class: string | null;
  campaignScheduleDate: string | null;
  consentStatus: boolean | null;
  consentDate: string | null;
  notes: string | null;
  campaignId: number;
}

// Đảm bảo mapping dữ liệu từ backend sang đúng dạng ConsentForm
// Nếu backend trả về snake_case thì bạn cần map lại, ví dụ: consent_id -> consentId
function mapConsentForm(apiObj: any): ConsentForm {
  return {
    consentId: apiObj.consentId ?? apiObj.ConsentId,
    vaccineName: apiObj.vaccineName ?? apiObj.VaccineName,
    studentName: apiObj.studentName ?? apiObj.StudentName ?? "",
    class: apiObj.class ?? apiObj.Class ?? "",
    campaignScheduleDate: apiObj.campaignScheduleDate ?? apiObj.CampaignScheduleDate ?? null,
    consentStatus: apiObj.consentStatus ?? apiObj.ConsentStatus ?? null,
    consentDate: apiObj.consentDate ?? apiObj.ConsentDate ?? null,
    notes: apiObj.notes ?? apiObj.Notes ?? null,
    campaignId: apiObj.campaignId ?? apiObj.CampaignId,
  };
}

const VaccinationRegistrationForm: React.FC<{ onLogout?: () => void }> = ({
  onLogout,
}) => {
  const navigate = useNavigate();
  const [consentForms, setConsentForms] = useState<ConsentForm[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [confirmation, setConfirmation] = useState<"yes" | "no" | "">("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy danh sách phiếu xác nhận của phụ huynh
  useEffect(() => {
    setLoading(true);
    getParentConsentForms()
      .then((forms: any[]) => {
        // Chuyển đổi dữ liệu về đúng dạng ConsentForm
        const mappedForms = Array.isArray(forms) ? forms.map(mapConsentForm) : [];
        setConsentForms(mappedForms);
        // Mặc định chọn phiếu đầu tiên chưa xác nhận (nếu có)
        const firstUnconfirmed = mappedForms.find((f) => f.consentStatus === null);
        if (firstUnconfirmed) {
          setSelectedFormId(firstUnconfirmed.consentId);
        } else if (mappedForms.length > 0 && mappedForms[0]) {
          setSelectedFormId(mappedForms[0].consentId);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedFormId ||
      !confirmation
    ) {
      alert("Thiếu thông tin hoặc chưa chọn xác nhận.");
      return;
    }
    setLoading(true);
    try {
      await sendVaccinationConsent(selectedFormId, {
        consentStatus: confirmation === "yes",
        notes,
      });
      alert("Đã gửi xác nhận thành công!");
      navigate("/parent/vaccination-event-dashboard");
    } catch (err: any) {
      alert("Có lỗi khi gửi xác nhận: " + err?.message);
    }
    setLoading(false);
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedFormId(id);
    setConfirmation("");
    setNotes("");
  };

  const selectedForm =
    consentForms.find((f) => f.consentId === selectedFormId) || null;

  const handleNavigateToHome = () => navigate("/");
  const handleNavigateToNews = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("school-health-news");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleNavigateToContact = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (loading) return <div>Đang tải...</div>;
  if (!consentForms.length)
    return <div>Bạn không có phiếu xác nhận tiêm chủng nào.</div>;

  return (
    <>
      <Navbar
        {...(onLogout ? { onLogout } : {})}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToContact={handleNavigateToContact}
      />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Xác nhận tiêm chủng
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {consentForms.length > 1 && (
            <div style={{ marginBottom: "15px" }}>
              <b>Chọn phiếu xác nhận:</b>{" "}
              <select value={selectedFormId ?? ""} onChange={handleChangeForm}>
                {consentForms.map((form) => (
                  <option key={form.consentId} value={form.consentId}>
                    {form.studentName} - {form.vaccineName} -{" "}
                    {form.campaignScheduleDate
                      ? new Date(form.campaignScheduleDate).toLocaleDateString()
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedForm ? (
            <>
              <div style={{ marginBottom: "15px" }}>
                <b>Tên học sinh:</b> {selectedForm.studentName}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <b>Lớp:</b> {selectedForm.class || "Chưa có lớp"}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <b>Loại vaccin:</b> {selectedForm.vaccineName}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <b>Lịch tiêm:</b>{" "}
                {selectedForm.campaignScheduleDate
                  ? new Date(selectedForm.campaignScheduleDate).toLocaleString()
                  : ""}
              </div>
              {selectedForm.consentStatus === null ? (
                <>
                  <div style={{ margin: "24px 0" }}>
                    <b>
                      Phụ huynh học sinh có đồng ý cho con em mình tham gia kì
                      tiêm chủng này không?
                    </b>
                    <div style={{ marginTop: "10px" }}>
                      <label style={{ marginRight: "20px" }}>
                        <input
                          type="radio"
                          name="confirmation"
                          value="yes"
                          checked={confirmation === "yes"}
                          onChange={() => setConfirmation("yes")}
                        />{" "}
                        Có
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="confirmation"
                          value="no"
                          checked={confirmation === "no"}
                          onChange={() => setConfirmation("no")}
                        />{" "}
                        Không
                      </label>
                    </div>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <b>Ý kiến phụ huynh (nếu có):</b>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginTop: "4px",
                      }}
                      placeholder="Nhập ý kiến (nếu có)..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#3498db",
                      color: "white",
                      padding: "10px 24px",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "block",
                      margin: "0 auto",
                    }}
                  >
                    {loading ? "Đang gửi..." : "Xác nhận"}
                  </button>
                </>
              ) : (
                <div style={{ color: "green", fontWeight: 600 }}>
                  Đã xác nhận:{" "}
                  {selectedForm.consentStatus
                    ? "Đồng ý tiêm chủng"
                    : "Không đồng ý tiêm chủng"}
                  {selectedForm.consentDate && (
                    <>
                      {" "}
                      lúc{" "}
                      {new Date(selectedForm.consentDate).toLocaleString()}
                    </>
                  )}
                  {selectedForm.notes && (
                    <div>
                      <b>Ý kiến:</b> {selectedForm.notes}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div>Không tìm thấy phiếu xác nhận.</div>
          )}
        </form>
      </div>
    </>
  );
};

export default VaccinationRegistrationForm;