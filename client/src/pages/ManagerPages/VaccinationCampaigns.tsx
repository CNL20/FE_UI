import React, { useState, useEffect } from "react";
import {
  getVaccinationCampaigns,
  createVaccinationCampaign,
} from "../../services/vaccinationService";
import { VaccinationCampaign } from "../../types/vaccination";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ArrowBack, Search, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/**
 * Đường dẫn API backend (sửa lại nếu backend chạy cổng/địa chỉ khác)
 */
const API_URL = process.env['REACT_APP_API_URL'] || "http://localhost:5000";

type ConsentSummary = {
  campaignId: number;
  status: "accepted" | "rejected" | "pending";
};

type Nurse = {
  nurseId: number;
  name: string;
  phone: string;
};

type VaccinationResult = {
  studentId: number;
  studentName: string;
  vaccineName: string;
  dateOfVaccination: string;
  status: string;
};

const VaccinationCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<VaccinationCampaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<VaccinationCampaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [consentSummaries, setConsentSummaries] = useState<ConsentSummary[]>([]);
  const [form, setForm] = useState({
    vaccineName: "",
    scheduleDate: "",
    targetClass: "",
  });
  const [view, setView] = useState<"consent" | "assignNurse" | "result" | "all">("all");

  // Modal tạo chiến dịch
  const [createModal, setCreateModal] = useState(false);

  // State cho modal bổ nhiệm y tá
  const [assignNurseModal, setAssignNurseModal] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<number | null>(null);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [selectedNurse, setSelectedNurse] = useState<number | null>(null);
  const [loadingNurses, setLoadingNurses] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<string | null>(null);
  const [assignError, setAssignError] = useState<string | null>(null);

  // State cho modal kết quả tiêm
  const [resultModal, setResultModal] = useState(false);
  const [resultList, setResultList] = useState<VaccinationResult[]>([]);
  const [loadingResult, setLoadingResult] = useState(false);
  const [currentResultCampaign, setCurrentResultCampaign] = useState<VaccinationCampaign | null>(null);

  // State cho gửi thông báo kết quả tiêm
  const [notifyLoading, setNotifyLoading] = useState<number | null>(null);
  const [notifyMessage, setNotifyMessage] = useState<string | null>(null);
  const fetchCampaigns = async () => {
    const campaigns = await getVaccinationCampaigns();
    setCampaigns(campaigns);
    setFilteredCampaigns(campaigns);
  };

  // Xử lý tìm kiếm
  useEffect(() => {
    const filtered = campaigns.filter(campaign =>
      campaign.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.targetClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.scheduleDate.includes(searchTerm)
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  const fetchConsentSummaries = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/vaccination/campaigns/consent-summary`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setConsentSummaries(data);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchConsentSummaries();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createVaccinationCampaign(form);
    await fetchCampaigns();
    await fetchConsentSummaries();
    setForm({ vaccineName: "", scheduleDate: "", targetClass: "" });
    setCreateModal(false);
  };

  const getConsentStatus = (campaignId: number) => {
    const found = consentSummaries.find(c => c.campaignId === campaignId);
    return found?.status ?? "pending";
  };

  const handleViewConsents = () => setView("consent");
  const handleViewAssignNurse = () => setView("assignNurse");
  const handleViewResults = () => setView("result");
  const handleViewAll = () => setView("all");

  const fetchNurses = async () => {
    setLoadingNurses(true);
    setAssignError(null);
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/vaccination/school-nurse`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setNurses(data);
    } else {
      setAssignError("Không lấy được danh sách y tá.");
      setNurses([]);
    }
    setLoadingNurses(false);
  };

  const handleAssignNurse = async (campaignId: number) => {
    setCurrentCampaignId(campaignId);
    setSelectedNurse(null);
    setAssignSuccess(null);
    setAssignError(null);
    await fetchNurses();
    setAssignNurseModal(true);
  };

  const handleSubmitAssignNurse = async () => {
    if (!selectedNurse || !currentCampaignId) return;
    setAssigning(true);
    setAssignError(null);
    setAssignSuccess(null);
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/vaccination/campaigns/${currentCampaignId}/assign-nurse`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ nurseId: selectedNurse }),
    });
    if (res.ok) {
      setAssignSuccess("Bổ nhiệm y tá thành công!");
    } else {
      const data = await res.json();
      setAssignError(data?.error || "Bổ nhiệm y tá thất bại.");
    }
    setAssigning(false);
  };

  const handleCloseAssignNurseModal = () => {
    setAssignNurseModal(false);
    setCurrentCampaignId(null);
    setSelectedNurse(null);
    setAssignSuccess(null);
    setAssignError(null);
  };

  const handleViewResultModal = async (campaign: VaccinationCampaign) => {
    setCurrentResultCampaign(campaign);
    setResultModal(true);
    setLoadingResult(true);
    setResultList([]);
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/vaccination/campaigns/${campaign.campaignId}/results`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setResultList(data || []);
    } else {
      setResultList([]);
    }
    setLoadingResult(false);
  };

  const handleCloseResultModal = () => {
    setResultModal(false);
    setCurrentResultCampaign(null);
    setResultList([]);
    setLoadingResult(false);
  };

  // GỬI THÔNG BÁO KẾT QUẢ TIÊM CHỦNG CHO PHỤ HUYNH
  const handleNotifyParents = async (campaignId: number) => {
    if (!window.confirm("Bạn có chắc muốn gửi thông báo kết quả tiêm cho phụ huynh các học sinh đã tiêm?")) return;
    setNotifyLoading(campaignId);
    setNotifyMessage(null);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/vaccination/campaigns/${campaignId}/notify-parents`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setNotifyMessage(data?.message || "Gửi thông báo thành công!");
      } else {
        setNotifyMessage(data?.error || "Gửi thông báo thất bại!");
      }
    } catch {
      setNotifyMessage("Có lỗi khi gửi thông báo!");
    }
    setNotifyLoading(null);
  };  return (
    <Box p={3}>
      {/* Nút Quay lại */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton 
          onClick={() => navigate("/manager")}
          sx={{ 
            mr: 2,
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Quản lý chiến dịch tiêm chủng
        </Typography>
      </Box>

      {/* Thanh tìm kiếm và nút tạo chiến dịch */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          placeholder="Tìm kiếm theo tên vaccine, lớp, ngày tiêm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setCreateModal(true)}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
            px: 3
          }}
        >
          Tạo chiến dịch
        </Button>
      </Box>

      {/* Các button chuyển view */}
      <Box mb={2} display="flex" gap={2}>
        <Button variant={view === "all" ? "contained" : "outlined"} onClick={handleViewAll}>
          Tất cả chiến dịch
        </Button>
        <Button variant={view === "consent" ? "contained" : "outlined"} onClick={handleViewConsents}>
          Xem xác nhận
        </Button>
        <Button variant={view === "assignNurse" ? "contained" : "outlined"} onClick={handleViewAssignNurse}>
          Bổ nhiệm y tá
        </Button>
        <Button variant={view === "result" ? "contained" : "outlined"} onClick={handleViewResults}>
          Kết quả tiêm
        </Button>
      </Box>

      {/* Hiển thị bảng */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên vaccin</TableCell>
            <TableCell>Ngày tiêm</TableCell>
            <TableCell>Lớp</TableCell>
            {(view === "all" || view === "consent") && <TableCell>Xác nhận</TableCell>}
            {(view === "all" || view === "assignNurse") && <TableCell>Bổ nhiệm y tá</TableCell>}
            {(view === "all" || view === "result") && <TableCell>Kết quả tiêm</TableCell>}
            {(view === "all" || view === "result") && <TableCell>Gửi thông báo</TableCell>}
          </TableRow>
        </TableHead>        <TableBody>
          {filteredCampaigns.map((c) => (
            <TableRow key={c.campaignId}>
              <TableCell>{c.vaccineName}</TableCell>
              <TableCell>{c.scheduleDate}</TableCell>
              <TableCell>{c.targetClass}</TableCell>

              {/* Cột xác nhận: hiện trạng thái */}
              {(view === "all" || view === "consent") && (
                <TableCell>
                  {(() => {
                    const status = getConsentStatus(c.campaignId);
                    if (status === "accepted")
                      return <span style={{ color: "green", fontWeight: 600 }}>Đồng ý</span>;
                    if (status === "rejected")
                      return <span style={{ color: "red", fontWeight: 600 }}>Không đồng ý</span>;
                    return <span style={{ color: "gray" }}>Chưa xác nhận</span>;
                  })()}
                </TableCell>
              )}

              {/* Cột bổ nhiệm y tá */}
              {(view === "all" || view === "assignNurse") && (
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAssignNurse(c.campaignId)}
                  >
                    Bổ nhiệm y tá
                  </Button>
                </TableCell>
              )}

              {/* Cột kết quả tiêm */}
              {(view === "all" || view === "result") && (
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewResultModal(c)}
                  >
                    Kết quả tiêm
                  </Button>
                </TableCell>
              )}

              {/* Cột gửi thông báo kết quả */}
              {(view === "all" || view === "result") && (
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    disabled={notifyLoading === c.campaignId}
                    onClick={() => handleNotifyParents(c.campaignId)}
                  >
                    {notifyLoading === c.campaignId ? <CircularProgress size={18} /> : "Gửi thông báo"}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal bổ nhiệm y tá */}
      <Dialog open={assignNurseModal} onClose={handleCloseAssignNurseModal}>
        <DialogTitle>Bổ nhiệm y tá cho chiến dịch</DialogTitle>
        <DialogContent>
          {loadingNurses ? (
            <Box display="flex" alignItems="center" justifyContent="center" minWidth={250} minHeight={80}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <Select
              fullWidth
              value={selectedNurse || ""}
              onChange={e => setSelectedNurse(Number(e.target.value))}
              displayEmpty
            >
              <MenuItem value="">Chọn y tá...</MenuItem>
              {nurses.map(n => (
                <MenuItem key={n.nurseId} value={n.nurseId}>
                  {n.name} ({n.phone})
                </MenuItem>
              ))}
            </Select>
          )}
          {assignSuccess && <Typography color="success.main" mt={2}>{assignSuccess}</Typography>}
          {assignError && <Typography color="error.main" mt={2}>{assignError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignNurseModal}>Hủy</Button>
          <Button
            onClick={handleSubmitAssignNurse}
            disabled={!selectedNurse || assigning}
            variant="contained"
          >
            {assigning ? <CircularProgress size={18} /> : "Bổ nhiệm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal kết quả tiêm */}
      <Dialog open={resultModal} onClose={handleCloseResultModal} maxWidth="md" fullWidth>
        <DialogTitle>
          Kết quả tiêm chủng {currentResultCampaign ? `- ${currentResultCampaign.vaccineName} / Lớp ${currentResultCampaign.targetClass}` : ""}
        </DialogTitle>
        <DialogContent>
          {loadingResult ? (
            <Box display="flex" alignItems="center" justifyContent="center" minWidth={400} minHeight={120}>
              <CircularProgress size={36} />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Học sinh</TableCell>
                  <TableCell>Vắc xin</TableCell>
                  <TableCell>Ngày tiêm</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">Không có dữ liệu kết quả tiêm chủng!</TableCell>
                  </TableRow>
                ) : (
                  resultList.map((row) => (
                    <TableRow key={row.studentId + row.vaccineName + row.dateOfVaccination}>
                      <TableCell>{row.studentName}</TableCell>
                      <TableCell>{row.vaccineName}</TableCell>
                      <TableCell>{row.dateOfVaccination ? new Date(row.dateOfVaccination).toLocaleDateString() : ""}</TableCell>
                      <TableCell>
                        {row.status === "Done" ? "Hoàn thành" : row.status}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultModal}>Đóng</Button>
        </DialogActions>      </Dialog>

      {/* Modal tạo chiến dịch */}
      <Dialog open={createModal} onClose={() => setCreateModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo chiến dịch tiêm chủng mới</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
              <TextField
                label="Tên vaccin"
                value={form.vaccineName}
                onChange={(e) => setForm((f) => ({ ...f, vaccineName: e.target.value }))}
                required
                fullWidth
                placeholder="Ví dụ: Vaccine phòng cúm, COVID-19..."
              />
              <TextField
                type="date"
                label="Ngày tiêm"
                InputLabelProps={{ shrink: true }}
                value={form.scheduleDate}
                onChange={(e) => setForm((f) => ({ ...f, scheduleDate: e.target.value }))}
                required
                fullWidth
              />
              <TextField
                label="Lớp mục tiêu"
                value={form.targetClass}
                onChange={(e) => setForm((f) => ({ ...f, targetClass: e.target.value }))}
                required
                fullWidth
                placeholder="Ví dụ: 12A1, 11A1, hoặc Tất cả"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setCreateModal(false)}
              sx={{ mr: 1 }}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#1565c0" }
              }}
            >
              Tạo chiến dịch
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Thông báo gửi kết quả */}
      <Snackbar
        open={!!notifyMessage}
        autoHideDuration={3500}
        onClose={() => setNotifyMessage(null)}
        message={notifyMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  );
};

export default VaccinationCampaigns;