import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Snackbar,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ArrowBack, Search, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  getHealthCheckCampaigns,
  createHealthCheckCampaign,
  getHealthCheckResults,
  assignStaffToCampaign,
  notifyParentsHealthCheck,
  getHealthCheckStaff,
} from "../../services/healthCheckService";

type HealthCheckCampaign = {
  campaignId: number;
  name: string;
  startDate: string;
  targetClass: string;
  staffName?: string;
};

type HealthCheckResult = {
  studentId: number;
  studentName: string;
  class: string;
  result: string;
  notes?: string;
  date: string;
  status: "Normal" | "NeedFollowUp" | "Critical";
};

type Staff = {
  staffId: number;
  name: string;
  role: string;
};

const HealthCheckCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<HealthCheckCampaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<HealthCheckCampaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    targetClass: "",
  });
  const [loading, setLoading] = useState(false);

  // Modal tạo chiến dịch
  const [createModal, setCreateModal] = useState(false);

  // Modal bổ nhiệm staff
  const [assignModal, setAssignModal] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<number | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<number | "">("");
  const [assigning, setAssigning] = useState(false);
  const [assignMessage, setAssignMessage] = useState<string | null>(null);

  // Modal kết quả khám
  const [resultModal, setResultModal] = useState(false);
  const [results, setResults] = useState<HealthCheckResult[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);

  // Thông báo gửi kết quả khám
  const [notifyLoading, setNotifyLoading] = useState<number | null>(null);
  const [notifyMessage, setNotifyMessage] = useState<string | null>(null);

  // Snackbar tạo thành công/thất bại
  const [snackbar, setSnackbar] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);
  // Map các trường backend trả về thành đúng field FE cần
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await getHealthCheckCampaigns();
      const mappedData = data.map((c: any) => ({
        ...c,
        staffName: c.nurseName || "-", // Map nurseName từ backend sang staffName cho frontend
        targetClass: c.targetClass || c.target_class || "-", // Nếu có, nếu không thì "-"
      }));
      setCampaigns(mappedData);
      setFilteredCampaigns(mappedData);
    } catch {
      setSnackbar("Không tải được danh sách chiến dịch!");
    }
    setLoading(false);
  };

  // Xử lý tìm kiếm
  useEffect(() => {
    const filtered = campaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.targetClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (campaign.staffName && campaign.staffName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHealthCheckCampaign(form);
      setSnackbar("Tạo chiến dịch thành công!");
      fetchCampaigns();
      setForm({ name: "", startDate: "", targetClass: "" });
      setCreateModal(false);
    } catch {
      setSnackbar("Tạo chiến dịch thất bại!");
    }
  };

  // MODAL bổ nhiệm staff
  const handleOpenAssignModal = async (campaignId: number) => {
    setCurrentCampaignId(campaignId);
    setSelectedStaff("");
    setAssignMessage(null);
    setAssignModal(true);
    try {
      const staff = await getHealthCheckStaff();
      const mappedList = (staff || []).map((s: any) => ({
        staffId: s.nurseId ?? s.staffId ?? s.id,
        name: s.name,
        role: s.role ?? "Y tá"
      }));
      setStaffList(mappedList);
    } catch {
      setStaffList([]);
    }
  };

  const handleAssignStaff = async () => {
    if (!currentCampaignId || selectedStaff === "") return;
    setAssigning(true);
    setAssignMessage(null);
    try {
      await assignStaffToCampaign(currentCampaignId, Number(selectedStaff));
      setAssignMessage("Bổ nhiệm thành công!");
      fetchCampaigns();
    } catch {
      setAssignMessage("Bổ nhiệm thất bại!");
    }
    setAssigning(false);
  };

  // MODAL kết quả khám
  const handleOpenResultModal = async (campaignId: number) => {
    setResultModal(true);
    setResults([]);
    setResultsLoading(true);
    try {
      const data = await getHealthCheckResults(campaignId);
      setResults(data);
    } catch {
      setResults([]);
    }
    setResultsLoading(false);
  };

  // Gửi thông báo kết quả khám
  const handleNotify = async (campaignId: number) => {
    if (!window.confirm("Bạn có chắc muốn gửi thông báo kết quả khám cho phụ huynh?")) return;
    setNotifyLoading(campaignId);
    setNotifyMessage(null);
    try {
      await notifyParentsHealthCheck(campaignId);
      setNotifyMessage("Đã gửi thông báo tới phụ huynh!");
    } catch {
      setNotifyMessage("Có lỗi khi gửi thông báo!");
    }
    setNotifyLoading(null);
  };

  // Xử lý giá trị ngày mặc định SQL '0001-01-01'
  const renderStartDate = (startDate: string) => {
    if (
      !startDate ||
      startDate === "0001-01-01" ||
      startDate === "0001-01-01T00:00:00" ||
      isNaN(new Date(startDate).getTime())
    ) {
      return "-";
    }
    return new Date(startDate).toLocaleDateString("vi-VN");
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
          Quản lý chiến dịch khám sức khỏe
        </Typography>
      </Box>

      {/* Thanh tìm kiếm và nút tạo chiến dịch */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          placeholder="Tìm kiếm theo tên chiến dịch, lớp, nhân viên..."
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên chiến dịch</TableCell>
            <TableCell>Ngày khám</TableCell>
            <TableCell>Lớp</TableCell>
            <TableCell>Nhân viên y tế</TableCell>
            <TableCell>Bổ nhiệm</TableCell>
            <TableCell>Kết quả</TableCell>
            <TableCell>Gửi thông báo</TableCell>
          </TableRow>
        </TableHead>        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress size={28} />
              </TableCell>
            </TableRow>
          ) : filteredCampaigns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                {campaigns.length === 0 ? "Không có chiến dịch nào!" : "Không tìm thấy kết quả phù hợp!"}
              </TableCell>
            </TableRow>
          ) : (
            filteredCampaigns.map((c) => (
              <TableRow key={c.campaignId}>
                <TableCell>{c.name || "-"}</TableCell>
                <TableCell>
                  {renderStartDate(c.startDate)}
                </TableCell>
                <TableCell>{c.targetClass || "-"}</TableCell>
                <TableCell>{c.staffName || "-"}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleOpenAssignModal(c.campaignId)}>
                    Bổ nhiệm
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleOpenResultModal(c.campaignId)}>
                    Kết quả
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    disabled={notifyLoading === c.campaignId}
                    onClick={() => handleNotify(c.campaignId)}
                  >
                    {notifyLoading === c.campaignId ? <CircularProgress size={18} /> : "Gửi thông báo"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal bổ nhiệm staff */}
      <Dialog open={assignModal} onClose={() => setAssignModal(false)}>
        <DialogTitle>Bổ nhiệm nhân viên y tế</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedStaff}
            onChange={e => {
              const value = e.target.value === "" ? "" : Number(e.target.value);
              setSelectedStaff(value);
            }}
            displayEmpty
          >
            <MenuItem value="">Chọn nhân viên...</MenuItem>
            {staffList.length === 0 ? (
              <MenuItem value="" disabled>Không có nhân viên y tế nào</MenuItem>
            ) : (
              staffList.map(staff => (
                <MenuItem key={staff.staffId} value={staff.staffId}>
                  {staff.name} ({staff.role})
                </MenuItem>
              ))
            )}
          </Select>
          {assignMessage && (
            <Typography color={assignMessage.includes("thành công") ? "success.main" : "error.main"} mt={2}>
              {assignMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignModal(false)}>Hủy</Button>
          <Button
            variant="contained"
            disabled={!selectedStaff || assigning}
            onClick={handleAssignStaff}
          >
            {assigning ? <CircularProgress size={18} /> : "Bổ nhiệm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal kết quả khám */}
      <Dialog open={resultModal} onClose={() => setResultModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Kết quả khám sức khỏe</DialogTitle>
        <DialogContent>
          {resultsLoading ? (
            <Box display="flex" alignItems="center" justifyContent="center" minWidth={400} minHeight={120}>
              <CircularProgress size={36} />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Học sinh</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Kết quả</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  <TableCell>Ngày khám</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">Không có dữ liệu!</TableCell>
                  </TableRow>
                ) : (
                  results.map((row) => (
                    <TableRow key={row.studentId}>
                      <TableCell>{row.studentName}</TableCell>
                      <TableCell>{row.class}</TableCell>
                      <TableCell>{row.result}</TableCell>
                      <TableCell>{row.notes || ""}</TableCell>
                      <TableCell>{row.date ? new Date(row.date).toLocaleDateString() : ""}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            row.status === "Normal"
                              ? "green"
                              : row.status === "NeedFollowUp"
                              ? "orange"
                              : "red",
                        }}
                      >
                        {row.status === "Normal"
                          ? "Bình thường"
                          : row.status === "NeedFollowUp"
                          ? "Cần theo dõi"
                          : "Nguy cấp"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResultModal(false)}>Đóng</Button>
        </DialogActions>      </Dialog>

      {/* Modal tạo chiến dịch */}
      <Dialog open={createModal} onClose={() => setCreateModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo chiến dịch khám sức khỏe mới</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
              <TextField
                label="Tên chiến dịch"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                fullWidth
                placeholder="Ví dụ: Khám sức khỏe định kỳ học kỳ 1"
              />
              <TextField
                type="date"
                label="Ngày khám"
                InputLabelProps={{ shrink: true }}
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
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

      {/* Snackbar & Notify */}
      <Snackbar
        open={!!snackbar || !!notifyMessage}
        autoHideDuration={3500}
        onClose={() => {
          setSnackbar(null);
          setNotifyMessage(null);
        }}
        message={snackbar || notifyMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Box>
  );
};

export default HealthCheckCampaigns;