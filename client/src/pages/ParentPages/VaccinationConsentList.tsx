import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Alert, Snackbar } from "@mui/material";
import { VaccinationConsent, VaccinationCampaign } from "../../types/vaccination";
import { getParentConsentForms, getVaccinationCampaigns, sendVaccinationConsent } from "../../services/vaccinationService";

// COMPONENT HIỂN THỊ TỪNG PHIẾU
const ConsentCard: React.FC<{
  consent: VaccinationConsent;
  scheduleDate: string | undefined;
  onRespond: (consentStatus: boolean) => void;
  disabled?: boolean;
}> = ({ consent, scheduleDate, onRespond, disabled }) => (
  <div style={{ border: "1px solid #ccc", borderRadius: 8, marginBottom: 18, padding: 16 }}>
    <Typography variant="h6">{consent.student?.name} ({consent.class})</Typography>
    <Typography variant="body1">Vắc xin: {consent.vaccineName}</Typography>
    <Typography variant="body2">
      Ngày tiêm dự kiến: {scheduleDate
        ? new Date(scheduleDate).toLocaleDateString()
        : ""}
    </Typography>
    <div style={{ marginTop: 12 }}>
      <button
        style={{
          padding: "6px 18px",
          marginRight: 10,
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
        disabled={disabled}
        onClick={() => onRespond(true)}
      >
        Đồng ý tiêm chủng
      </button>
      <button
        style={{
          padding: "6px 18px",
          background: "#fff",
          border: "1px solid #dc2626",
          color: "#dc2626",
          borderRadius: 4,
          cursor: "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
        disabled={disabled}
        onClick={() => onRespond(false)}
      >
        Không đồng ý
      </button>
    </div>
  </div>
);

// COMPONENT CHÍNH
const VaccinationConsentList: React.FC = () => {
  const [consents, setConsents] = useState<VaccinationConsent[]>([]);
  const [campaigns, setCampaigns] = useState<VaccinationCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Lấy danh sách phiếu xác nhận và campaign
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getParentConsentForms(),
      getVaccinationCampaigns(),
    ])
      .then(([consentsRes, campaignsRes]) => {
        setConsents(consentsRes);
        setCampaigns(campaignsRes);
      })
      .catch(() => setAlert({ type: "error", msg: "Không thể tải danh sách phiếu xác nhận!" }))
      .finally(() => setLoading(false));
  }, []);

  // Xử lý đồng ý/không đồng ý
  const handleRespond = async (consent: VaccinationConsent, consentStatus: boolean) => {
    setRespondingId(consent.consentId);
    try {
      await sendVaccinationConsent(consent.consentId, { consentStatus });
      setConsents((prev) => prev.filter((c) => c.consentId !== consent.consentId));
      setAlert({ type: "success", msg: "Gửi xác nhận thành công!" });
    } catch {
      setAlert({ type: "error", msg: "Gửi xác nhận thất bại!" });
    } finally {
      setRespondingId(null);
    }
  };

  // Tìm scheduleDate theo campaignId
  const getScheduleDate = (campaignId: number) => 
    campaigns.find(c => c.campaignId === campaignId)?.scheduleDate;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Phiếu xác nhận tiêm chủng
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : consents.length === 0 ? (
        <Alert severity="info">Không có phiếu xác nhận nào cần phản hồi.</Alert>
      ) : (
        consents.map((consent) => (
          <ConsentCard
            key={consent.consentId}
            consent={consent}
            scheduleDate={getScheduleDate(consent.campaignId)}
            onRespond={(status) => handleRespond(consent, status)}
            disabled={respondingId === consent.consentId}
          />
        ))
      )}
      <Snackbar
        open={!!alert}
        autoHideDuration={2500}
        onClose={() => setAlert(null)}
        message={alert?.msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{ style: { background: alert?.type === "success" ? "#16a34a" : "#dc2626" } }}
      />
    </Container>
  );
};

export default VaccinationConsentList;