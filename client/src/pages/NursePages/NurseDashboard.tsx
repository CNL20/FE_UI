import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Paper,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  FormControlLabel,
  Switch,
  LinearProgress,
  Badge,  TablePagination,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  LocalHospital as HospitalIcon,
  Vaccines as VaccineIcon,
  Add as AddIcon,
  Warning as IncidentIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Info as InfoIcon,  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import { NurseDashboardProps, Student, MedicalIncident } from "../../types";
import apiClient, {
  searchStudents,
  getStudentMedicalInfo,
  createMedicalIncident,
  getMedicalIncidents,
  notifyParent,
} from "../../services/apiClient";
import { getAssignedCampaignsForNurse } from "../../services/vaccinationService";
import NurseHealthCheckCampaignList from "./NurseHealthCheckCampaignList";
import { incidentTypes } from '../../constants/incidentTypes';

// Types
type MedicalSupply = {
  id: number;
  name: string;
  quantity: number;
  expirationDate: string;
  location: string;
};

type VaccinationSchedule = {
  studentId: number;
  studentName: string;
  class: string;
  gender: string;
  parentId: number;
  parentName: string;
  parentPhone?: string;
  parentCccd: string;
  parentAccount: string;
  vaccineName: string;
  totalDoses?: number;
  dosesTaken?: number;
  nextDate: string;
  status: string;
  present?: boolean; // Added for attendance status
  vaccinationId?: number | null; 
};

type MedicineRequest = {
  id: number;
  studentName: string;
  parentName: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  time: string;
  reason: string;
  status: string;
  note: string;
};

type AssignedCampaign = {
  campaignId: number;
  vaccineName: string;
  scheduleDate: string;
  targetClass: string;
  assignedDate: string;
};

// Medical Incident Management Component
const MedicalIncidentManager: React.FC = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState<MedicalIncident[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] =
    useState<"success" | "error" | "info" | "warning">("info");  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters] = useState({
    severity: "",
    incidentType: "",
    status: "",
    dateFrom: "",
    dateTo: "",  });
  const [sortBy] = useState("dateTime");
  const [sortOrder] = useState<"asc" | "desc">("desc");
  const [incidentForm, setIncidentForm] = useState({
    studentId: 0,
    incidentType: "injury" as const,
    description: "",
    symptoms: [] as string[],
    severity: "low" as const,
    location: "",
    treatmentGiven: "",
    medicationsUsed: [] as string[],
    additionalNotes: "",
    parentNotified: false,
  });

  const [statistics, setStatistics] = useState({
    totalIncidents: 0,
    todayIncidents: 0,
    criticalIncidents: 0,
    resolvedIncidents: 0,
    incidentsByType: {},
    incidentsBySeverity: {},
    weeklyTrend: [],
  });

  const severityLevels = [
    { value: "low", label: "Thấp", color: "success" },
    { value: "medium", label: "Trung bình", color: "warning" },
    { value: "high", label: "Cao", color: "error" },
    { value: "critical", label: "Nghiêm trọng", color: "error" },
  ];

  const commonSymptoms = [
    "Sốt",
    "Đau đầu",
    "Buồn nôn",
    "Chóng mặt",
    "Đau bụng",
    "Ho",
    "Khó thở",
    "Phát ban",
    "Đau khớp",
    "Mệt mỏi",
    "Mất ý thức",
    "Xuất huyết",
    "Chuột rút",
  ];

  const commonMedications = [
    "Paracetamol",
    "Ibuprofen",
    "Băng gạc",
    "Thuốc sát trùng",
    "Nước muối sinh lý",
    "Thuốc cầm máu",
    "Thuốc chống dị ứng",
    "Oxy",
    "Thuốc nhỏ mắt",
    "Thuốc ho",
  ];

  const steps = [
    "Tìm Học Sinh",
    "Thông Tin Y Tế",
    "Ghi Nhận Sự Cố",
    "Xác Nhận",
  ];

  // Search students by name only
  const handleSearchStudents = async (query: string) => {
    if (query.length < 2) {
      setStudents([]);
      return;
    }

    setLoading(true);
    try {
      const response = await searchStudents(query);
      const studentData: Student[] = response.data || [];
      const filteredStudents = studentData.filter((student) => {
        const studentName = (student.name || "").toLowerCase();
        return studentName.includes(query.toLowerCase());
      });
      setStudents(filteredStudents);
      if (filteredStudents.length === 0) {
        setNotificationMessage(`Không tìm thấy học sinh nào có tên "${query}"`);
        setNotificationSeverity("info");
        setShowNotification(true);
      } else {
        setNotificationMessage(
          `Tìm thấy ${filteredStudents.length} học sinh có tên "${query}"`
        );
        setNotificationSeverity("success");
        setShowNotification(true);
      }
    } catch (error: any) {
      setStudents([]);
      setNotificationMessage(
        `Lỗi tìm kiếm: ${error.message || "Không thể kết nối đến server"}`
      );
      setNotificationSeverity("error");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async (student: Student) => {
    setSelectedStudent(student);

    const studentId =
      student.studentId ||
      student.id ||
      student.student_code ||
      student.studentCode;
    const numericStudentId =
      typeof studentId === "string"
        ? parseInt(studentId, 10)
        : studentId;

    if (!numericStudentId || isNaN(numericStudentId)) {
      setNotificationMessage("Lỗi: ID học sinh không hợp lệ");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }

    setIncidentForm((prev) => ({
      ...prev,
      studentId: numericStudentId,
    }));

    try {
      await getStudentMedicalInfo(numericStudentId.toString());
    } catch (error) {}

    setActiveStep(1);
  };

  const handleCreateIncident = async () => {
    if (!incidentForm.studentId || incidentForm.studentId === 0) {
      setNotificationMessage("Lỗi: Chưa chọn học sinh!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }

    if (!incidentForm.description.trim()) {
      setNotificationMessage("Lỗi: Vui lòng nhập mô tả sự cố!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }

    if (!incidentForm.location.trim()) {
      setNotificationMessage("Lỗi: Vui lòng nhập vị trí xảy ra sự cố!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }

    setLoading(true);
    try {
      await createMedicalIncident(incidentForm);
      setNotificationMessage("Sự cố y tế đã được ghi nhận thành công!");
      setNotificationSeverity("success");
      setShowNotification(true);
      setActiveStep(-1);
      setSelectedStudent(null);
      setIncidentForm({
        studentId: 0,
        incidentType: "injury",
        description: "",
        symptoms: [],
        severity: "low",
        location: "",
        treatmentGiven: "",
        medicationsUsed: [],
        additionalNotes: "",
        parentNotified: false,
      });
      loadIncidents();
    } catch (error: any) {
      let errorMessage = "Có lỗi xảy ra khi ghi nhận sự cố!";
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const errorDetails = Object.entries(validationErrors)
          .map(([field, messages]: [string, any]) =>
            `${field}: ${
              Array.isArray(messages) ? messages.join(", ") : messages
            }`
          )
          .join("; ");
        errorMessage = `Lỗi validation: ${errorDetails}`;
      } else if (error.response?.data?.title) {
        errorMessage = error.response.data.title;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setNotificationMessage(errorMessage);
      setNotificationSeverity("error");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };  const loadIncidents = async () => {
  try {
    const response = await getMedicalIncidents({
      ...filters,
      sortBy,
      sortOrder,
      page: (page + 1).toString(),
      limit: rowsPerPage.toString(),
    });
    // CHUẨN HÓA: Luôn có incidentType từ eventType (nếu có)
    const incidentData: MedicalIncident[] = (Array.isArray(response) ? response : []).map((i: any) => ({
  ...i,
  incidentType: i.incidentType || i.eventType || 'other',
}));
console.log(incidentData); // <- Xem giá trị incidentType từng dòng
setIncidents(incidentData);
    setIncidents(incidentData);
    calculateStatistics(incidentData);
  } catch (error: any) {
      console.error('❌ Error loading incidents:', error);
      setIncidents([]);
      if (error.response?.status !== 404) {
        setNotificationMessage(
          `Lỗi tải danh sách sự cố: ${error.message || "Không thể kết nối đến server"}`
        );
        setNotificationSeverity("error");
        setShowNotification(true);
      } else {
        setNotificationMessage("Chưa có sự cố y tế nào được ghi nhận");
        setNotificationSeverity("info");
        setShowNotification(true);
      }
    }
  };

  const handleNotifyParent = async (incidentId: string | number | undefined) => {
    if (!incidentId || incidentId === "undefined") {
      setNotificationMessage("Không tìm thấy ID sự cố để gửi thông báo!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }
    try {
      await notifyParent(String(incidentId), {
        message: "Thông báo về sự cố y tế của con em bạn",
      });
      setNotificationMessage("Đã thông báo cho phụ huynh!");
      setNotificationSeverity("success");
      setShowNotification(true);
      loadIncidents();
    } catch (error) {
      setNotificationMessage("Có lỗi khi thông báo cho phụ huynh!");
      setNotificationSeverity("error");
      setShowNotification(true);    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const calculateStatistics = useCallback((incidentList: MedicalIncident[]) => {
    const today = new Date().toDateString();

    const stats = {
      totalIncidents: incidentList.length,
      todayIncidents: incidentList.filter(
        (incident) =>
          new Date(incident.dateTime).toDateString() === today
      ).length,
      criticalIncidents: incidentList.filter(
        (incident) =>
          incident.severity === "critical" || incident.severity === "high"
      ).length,
      resolvedIncidents: incidentList.filter(
        (incident) => incident.status === "resolved"
      ).length,
      incidentsByType: incidentList.reduce((acc: any, incident) => {
        acc[incident.incidentType] = (acc[incident.incidentType] || 0) + 1;
        return acc;
      }, {}),
      incidentsBySeverity: incidentList.reduce((acc: any, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {}),
      weeklyTrend: [],
    };

    setStatistics(stats);
  }, []);
  const StatisticsDashboard = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: "primary.main", color: "white" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {statistics.totalIncidents}
                </Typography>
                <Typography variant="body2">Tổng sự cố</Typography>
              </Box>
              <IncidentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: "info.main", color: "white" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {statistics.todayIncidents}
                </Typography>
                <Typography variant="body2">Hôm nay</Typography>
              </Box>
              <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: "error.main", color: "white" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {statistics.criticalIncidents}
                </Typography>
                <Typography variant="body2">Nghiêm trọng</Typography>
              </Box>
              <HospitalIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>        </Card>
      </Grid>    </Grid>
  );

  useEffect(() => {
    loadIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy, sortOrder, page, rowsPerPage]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        handleSearchStudents(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      case "critical":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Quản Lý Sự Cố Y Tế
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setActiveStep(0)}
            sx={{ textTransform: "none" }}
          >
            Ghi Nhận Sự Cố Mới
          </Button>
        </Box>      </Box>
      <StatisticsDashboard />

      <Dialog
        open={activeStep >= 0}
        maxWidth="md"
        fullWidth
        aria-labelledby="incident-dialog-title"
        aria-describedby="incident-dialog-description"
        onClose={() => setActiveStep(-1)}
      >
        <DialogTitle id="incident-dialog-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Ghi Nhận Sự Cố Y Tế</Typography>
            <IconButton onClick={() => setActiveStep(-1)} aria-label="Đóng dialog">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent id="incident-dialog-description">
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* Step 1: Search Students */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Tìm Kiếm Học Sinh Theo Tên
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Hướng dẫn:</strong> Nhập tên học sinh để tìm kiếm. Hệ
                  thống chỉ tìm kiếm theo tên, không bao gồm mã số hay thông tin
                  khác.
                </Typography>
              </Alert>
              <TextField
                fullWidth
                label="Tìm kiếm học sinh theo tên"
                placeholder="Nhập tên học sinh (ví dụ: Nguyễn Văn A)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
                sx={{ mb: 3 }}
                helperText="Nhập ít nhất 2 ký tự để tìm kiếm theo tên học sinh"
              />
              {loading && <LinearProgress sx={{ mb: 2 }} />}
              {students.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Tìm thấy {students.length} học sinh có tên "{searchQuery}"
                  </Typography>
                  <Grid container spacing={2}>
                    {students.map((student, index) => (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        key={`student-${index}-${student.studentId || student.id || student.studentCode || student.student_code}`}
                      >
                        <Card
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              boxShadow: 4,
                              transform: "translateY(-2px)",
                              transition: "all 0.2s ease-in-out",
                            },
                          }}
                          onClick={() => handleSelectStudent(student)}
                        >
                          <CardContent>
                            <Typography variant="h6" sx={{ color: "primary.main" }}>
                              {student.name}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Mã HS:</strong>{" "}
                              {student.studentCode || student.student_code || "N/A"}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Lớp:</strong> {student.class || "N/A"}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Phụ huynh:</strong> {student.parent?.name || "N/A"}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>SĐT phụ huynh:</strong> {student.parent?.phone || "N/A"}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Trường:</strong> {student.school || "N/A"}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Nhóm máu:</strong> {student.blood_type || "N/A"}
                            </Typography>
                            <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                              <Button size="small" variant="contained">
                                Chọn học sinh này
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              {searchQuery.length >= 2 &&
                students.length === 0 &&
                !loading && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Không tìm thấy học sinh nào có tên "{searchQuery}". Vui lòng
                      thử với tên khác.
                    </Typography>
                  </Alert>
                )}
            </Box>
          )}
          {/* Step 2: Student Medical Info */}
          {activeStep === 1 && selectedStudent && (
            <Box>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông Tin Học Sinh
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Họ tên:</strong> {selectedStudent.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Lớp:</strong> {selectedStudent.class}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Ngày sinh:</strong> {selectedStudent.dob}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        <strong>Nhóm máu:</strong> {selectedStudent.blood_type}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Ghi chú y tế:</strong>{" "}
                        {selectedStudent.parent?.emergencyContact || "Không có"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setActiveStep(0)}>Quay lại</Button>
                <Button variant="contained" onClick={() => setActiveStep(2)}>
                  Tiếp tục
                </Button>
              </Box>
            </Box>
          )}
          {/* Step 3: Incident Form */}
          {activeStep === 2 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Loại sự cố</InputLabel>
                    <Select
                      value={incidentForm.incidentType}
                      onChange={(e) =>
                        setIncidentForm((prev) => ({
                          ...prev,
                          incidentType: e.target.value as any,
                        }))
                      }
                    >
                      {incidentTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Mức độ nghiêm trọng</InputLabel>
                    <Select
                      value={incidentForm.severity}
                      onChange={(e) =>
                        setIncidentForm((prev) => ({
                          ...prev,
                          severity: e.target.value as any,
                        }))
                      }
                    >
                      {severityLevels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vị trí xảy ra sự cố"
                    value={incidentForm.location}
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Ví dụ: Sân chơi, lớp học, phòng y tế..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Mô tả sự cố"
                    value={incidentForm.description}
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Mô tả chi tiết về sự cố đã xảy ra..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={commonSymptoms}
                    value={incidentForm.symptoms}
                    onChange={(_, newValue) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        symptoms: newValue,
                      }))
                    }
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={`symptom-${option}-${index}`}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        id={params.id}
                        InputProps={params.InputProps}
                        inputProps={params.inputProps}
                        label="Triệu chứng"
                        placeholder="Chọn hoặc nhập triệu chứng..."
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Điều trị đã thực hiện"
                    value={incidentForm.treatmentGiven}
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        treatmentGiven: e.target.value,
                      }))
                    }
                    placeholder="Mô tả các biện pháp điều trị đã thực hiện..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={commonMedications}
                    value={incidentForm.medicationsUsed}
                    onChange={(_, newValue) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        medicationsUsed: newValue,
                      }))
                    }
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={`medication-${option}-${index}`}
                        />
                      ))
                    }                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{
                          ...params.InputLabelProps,
                          className: params.InputLabelProps?.className || "",
                          style: params.InputLabelProps?.style || {},
                        }}
                        label="Thuốc/Vật tư y tế đã sử dụng"
                        placeholder="Chọn hoặc nhập thuốc đã sử dụng..."
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Ghi chú thêm"
                    value={incidentForm.additionalNotes}
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        additionalNotes: e.target.value,
                      }))
                    }
                    placeholder="Ghi chú thêm (nếu có)..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={incidentForm.parentNotified}
                        onChange={(e) =>
                          setIncidentForm((prev) => ({
                            ...prev,
                            parentNotified: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="Đã thông báo cho phụ huynh"
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button onClick={() => setActiveStep(1)}>Quay lại</Button>
                <Button variant="contained" onClick={() => setActiveStep(3)}>
                  Xem trước
                </Button>
              </Box>
            </Box>
          )}
          {/* Step 4: Confirmation */}
          {activeStep === 3 && selectedStudent && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Xác Nhận Thông Tin
              </Typography>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Học sinh
                      </Typography>
                      <Typography variant="body1">
                        {selectedStudent.name} - {selectedStudent.class}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Loại sự cố
                      </Typography>
                      <Typography variant="body1">
                        {incidentTypes.find((t) => t.value === incidentForm.incidentType)?.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Mức độ
                      </Typography>
                      <Chip
                        label={severityLevels.find((s) => s.value === incidentForm.severity)?.label}
                        color={getSeverityColor(incidentForm.severity) as any}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Vị trí
                      </Typography>
                      <Typography variant="body1">{incidentForm.location}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Mô tả
                      </Typography>
                      <Typography variant="body1">{incidentForm.description}</Typography>
                    </Grid>
                    {incidentForm.symptoms.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Triệu chứng
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                          {incidentForm.symptoms.map((symptom, index) => (
                            <Chip key={`symptom-chip-${symptom}-${index}`} label={symptom} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Điều trị
                      </Typography>
                      <Typography variant="body1">{incidentForm.treatmentGiven}</Typography>
                    </Grid>
                    {incidentForm.medicationsUsed.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Thuốc/Vật tư sử dụng
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                          {incidentForm.medicationsUsed.map((med, index) => (
                            <Chip key={`medication-chip-${med}-${index}`} label={med} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setActiveStep(2)}>Quay lại</Button>
                <Button
                  variant="contained"
                  onClick={handleCreateIncident}
                  disabled={loading}
                  startIcon={loading ? <LinearProgress /> : <SaveIcon />}
                >
                  {loading ? "Đang lưu..." : "Lưu sự cố"}
                </Button>
              </Box>
            </Box>
          )}        </DialogContent>
      </Dialog>
      <Paper sx={{ mt: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6">Danh Sách Sự Cố Y Tế</Typography>
          <Typography variant="body2" color="text.secondary">
            Đã tải {incidents.length} sự cố {incidents.length > 0 && incidents[0]?.id && typeof incidents[0].id === 'string' && incidents[0].id.includes("mock") ? "(Dữ liệu mẫu)" : ""}
          </Typography>
        </Box>
        <TableContainer>
          <Table>            <TableHead>
              <TableRow>
                <TableCell>Học sinh</TableCell>
                <TableCell>Loại sự cố</TableCell>
                <TableCell>Mức độ</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>            
              </TableHead>
            <TableBody>
              {incidents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {incident.studentName || "N/A"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {incident.className || "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>                    
                    <TableCell>
                    {
                      incidentTypes.find(t =>
                        t.value === incident.incidentType
                      )?.label ||
                      incident.incidentType ||
                      "N/A"
                    }
                  </TableCell>
                    <TableCell>
                      {(() => {
                        const sev = severityLevels.find(
                          (s) => s.value === incident.severity
                        );
                        return (
                          <Chip
                            label={sev?.label || incident.severity || "N/A"}
                            color={
                              sev?.color === "success" ||
                              sev?.color === "error" ||
                              sev?.color === "info" ||
                              sev?.color === "warning" ||
                              sev?.color === "primary" ||
                              sev?.color === "secondary" ||
                              sev?.color === "default"
                                ? sev.color
                                : "default"
                            }
                            size="small"
                          />
                        );
                      })()}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {(() => {
                          let dateStr = incident.dateTime;
                          if (!dateStr) return "N/A";
                          const date = new Date(dateStr);
                          return isNaN(date.getTime())
                            ? "N/A"
                            : date.toLocaleDateString("vi-VN");
                        })()}                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip
                          title={
                            incident.parentNotified
                              ? "Đã thông báo phụ huynh"
                              : "Chưa thông báo phụ huynh"
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleNotifyParent(incident.id)}
                            disabled={incident.parentNotified}
                          >
                            <Badge
                              color={incident.parentNotified ? "success" : "error"}
                              variant="dot"
                            >
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xem chi tiết">
                          <IconButton size="small">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={incidents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`
            }
          />
        </TableContainer>
      </Paper>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={notificationSeverity}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const NurseDashboard: React.FC<NurseDashboardProps> = ({ onLogout }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // State: Medical Supplies
  const [supplies, setSupplies] = useState<MedicalSupply[]>([]);
  const [loadingSupplies, setLoadingSupplies] = useState(false);

  // State: Add Medical Supply Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [newSupply, setNewSupply] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
    location: "",
  });

  // State: Vaccination Campaigns assigned to nurse
  const [assignedCampaigns, setAssignedCampaigns] = useState<AssignedCampaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

  // State: Vaccination Schedule
  const [schedule, setSchedule] = useState<VaccinationSchedule[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  // State: Attendance
  const [attendance, setAttendance] = useState<{ [studentId: number]: "present" | "absent" | undefined }>({});
  const [savingAttendance, setSavingAttendance] = useState(false);

  // Trạng thái hoàn thành tiêm chủng
  const [completingIds, setCompletingIds] = useState<{ [studentId: number]: boolean }>({});
  // State: Medicine Requests
  const [medicineRequests, setMedicineRequests] = useState<MedicineRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Load Medical Supplies
  useEffect(() => {
    if (tabValue === 0) {
      setLoadingSupplies(true);
      apiClient
        .get("/medical-supplies")
        .then((res: any) => setSupplies(res.data || []))
        .catch(() => setSupplies([]))
        .finally(() => setLoadingSupplies(false));
    }
  }, [tabValue]);
  // Lấy danh sách campaign mà y tá được bổ nhiệm
  useEffect(() => {
    if (tabValue === 1) {
      getAssignedCampaignsForNurse()
        .then((data) => {
          const unique = data.filter(
            (item: AssignedCampaign, idx: number, arr: AssignedCampaign[]) =>
              arr.findIndex((x) => x.campaignId === item.campaignId) === idx
          );
          setAssignedCampaigns(unique);
          if (
            (!selectedCampaignId ||
              !unique.some((c) => c.campaignId === selectedCampaignId)) &&
            unique.length > 0
          ) {
            setSelectedCampaignId(unique[0].campaignId);
          }
        })
        .catch(() => setAssignedCampaigns([]));
    }
  }, [tabValue, selectedCampaignId]);

  // Load Vaccination Schedule cho campaign đã chọn
  useEffect(() => {
    if (tabValue === 1 && selectedCampaignId) {
      setLoadingSchedule(true);
      apiClient
        .get(`/vaccination/campaigns/${selectedCampaignId}/schedule`)
        .then((res: any) => {
          setSchedule(res.data || []);
          // Map trạng thái điểm danh từ backend
          const initialAttendance: { [studentId: number]: "present" | "absent" | undefined } = {};
          (res.data || []).forEach((item: VaccinationSchedule) => {
            if (item.present === true) initialAttendance[item.studentId] = "present";
            else if (item.present === false) initialAttendance[item.studentId] = "absent";
            else initialAttendance[item.studentId] = undefined;
          });
          setAttendance(initialAttendance);
        })
        .catch(() => {
          setSchedule([]);
          setAttendance({});
        })
        .finally(() => setLoadingSchedule(false));
    }
  }, [tabValue, selectedCampaignId]);  // Load Medicine Requests
  useEffect(() => {
    if (tabValue === 2) {
      setLoadingRequests(true);
      apiClient
        .get("/medicine-requests")
        .then((res: any) => setMedicineRequests(res.data || []))
        .catch(() => setMedicineRequests([]))
        .finally(() => setLoadingRequests(false));
    }
  }, [tabValue]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSupply((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddSupply = () => {
    apiClient
      .post("/medical-supplies", {
        name: newSupply.name,
        quantity: Number(newSupply.quantity),
        expirationDate: newSupply.expirationDate,
        location: newSupply.location,
      })
      .then(() => {
        setOpenDialog(false);
        setNewSupply({
          name: "",
          quantity: "",
          expirationDate: "",
          location: "",
        });
        setTabValue(0);
      })
      .catch(() => setOpenDialog(false));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabValue(newValue);

  const handleAttendanceChange = (studentId: number, value: "present" | "absent") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSaveAttendance = async () => {
  setSavingAttendance(true);

  const nurseId = Number(localStorage.getItem("nurse_id"));
  if (!nurseId) {
    alert("Không tìm thấy thông tin y tá! Vui lòng đăng nhập lại.");
    setSavingAttendance(false);
    return;
  }

  try {
    const attendanceList = Object.entries(attendance)
      .filter(([, status]) => status !== undefined)
      .map(([studentId, status]) => {
        // Tìm student trong schedule để lấy vaccinationId
        const studentSchedule = schedule.find((s) => s.studentId === Number(studentId));
        return {
          studentId: Number(studentId),
          nurseId,
          present: status === "present",
          vaccinationId: studentSchedule?.vaccinationId ?? null, // Thêm dòng này!
        };
      });
    if (attendanceList.length === 0) {
      alert("Vui lòng chọn trạng thái điểm danh cho ít nhất một học sinh.");
      setSavingAttendance(false);
      return;
    }
    await apiClient.post(
      `/vaccination/campaigns/${selectedCampaignId}/attendance`,
      attendanceList
    );
    alert("Lưu điểm danh thành công!");
  } catch {
    alert("Lưu điểm danh thất bại!");
  }
  setSavingAttendance(false);
};

  const handleCompleteVaccination = async (studentId: number) => {
    setCompletingIds((prev) => ({ ...prev, [studentId]: true }));

    const nurseId = Number(localStorage.getItem("nurse_id"));
    if (!nurseId) {
      alert("Không tìm thấy thông tin y tá! Vui lòng đăng nhập lại.");
      setCompletingIds((prev) => ({ ...prev, [studentId]: false }));
      return;
    }
    const student = schedule.find((s) => s.studentId === studentId);
    if (!student) {
      alert("Không tìm thấy thông tin học sinh.");
      setCompletingIds((prev) => ({ ...prev, [studentId]: false }));
      return;
    }

    try {
      await apiClient.post(`/vaccination/record`, {
      vaccinationId: student.vaccinationId,
      studentId: student.studentId,
      campaignId: selectedCampaignId,
      vaccineName: student.vaccineName,
      status: "Done",
      dateOfVaccination: new Date().toISOString(),
      administeredBy: nurseId,
    });
      alert(`Đã lưu hoàn thành tiêm chủng cho học sinh ${student.studentName}`);
      setLoadingSchedule(true);
      apiClient
        .get(`/vaccination/campaigns/${selectedCampaignId}/schedule`)
        .then((res: any) => setSchedule(res.data || []))
        .finally(() => setLoadingSchedule(false));
    } catch (err) {
      alert("Lưu trạng thái hoàn thành thất bại!");
    }
    setCompletingIds((prev) => ({ ...prev, [studentId]: false }));
  };

  return (
    <>      <Navbar
        onLogout={onLogout}
      />
      <Box
        sx={{
          width: "100%",
          p: 3,
          backgroundColor: alpha(theme.palette.background.default, 0.8),
        }}
      >
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <HospitalIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
              Quản Lý Y Tế Học Đường
            </Typography>
          </Box>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "medium",
              minHeight: 48,
            },
          }}        >
          <Tab icon={<HospitalIcon />} label="Vật Tư Y Tế" iconPosition="start" />
          <Tab icon={<VaccineIcon />} label="Lịch Tiêm Chủng" iconPosition="start" />
          <Tab icon={<AddIcon />} label="Đơn Yêu Cầu Thuốc" iconPosition="start" />
          <Tab icon={<HospitalIcon />} label="Khám Sức Khỏe" iconPosition="start" />
          <Tab icon={<IncidentIcon />} label="Sự Cố Y Tế" iconPosition="start" />
        </Tabs>

        {/* Tab 0: Medical Supplies */}
        {tabValue === 0 && (
          <>
            <Box sx={{ mb: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h6">Tổng Quan Vật Tư Y Tế</Typography>
                  <Typography variant="h4" color="primary">
                    {supplies.reduce((sum, s) => sum + s.quantity, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tổng số vật tư y tế trong kho
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={handleDialogOpen}
                >
                  Thêm Vật Tư Mới
                </Button>
              </Paper>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Vật Tư</TableCell>
                    <TableCell>Số Lượng</TableCell>
                    <TableCell>Hạn Sử Dụng</TableCell>                    <TableCell>Vị Trí</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>                  {loadingSupplies ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : supplies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Không có dữ liệu vật tư y tế!
                      </TableCell>
                    </TableRow>
                  ) : (
                    supplies.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          {row.expirationDate
                            ? new Date(row.expirationDate).toLocaleDateString("vi-VN")
                            : "Chưa cập nhật"}
                        </TableCell>                        <TableCell>{row.location}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Tab 1: Vaccination Schedule */}
        {tabValue === 1 && (
          <Box>
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6">Chọn chiến dịch tiêm chủng:</Typography>
              <Select
                value={selectedCampaignId || ""}
                onChange={(e) => setSelectedCampaignId(Number(e.target.value))}
                sx={{ minWidth: 250 }}
                disabled={assignedCampaigns.length === 0}
              >
                {assignedCampaigns.map((c) => (
                  <MenuItem value={c.campaignId} key={c.campaignId}>
                    {c.vaccineName} ({new Date(c.scheduleDate).toLocaleDateString()}) - Lớp {c.targetClass}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h5">Lịch Tiêm Chủng</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveAttendance}
                disabled={savingAttendance}
              >
                {savingAttendance ? "Đang lưu..." : "Lưu điểm danh"}
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Học Sinh</TableCell>
                    <TableCell>Loại Vắc Xin</TableCell>
                    <TableCell align="center">Ngày Tiêm Tiếp Theo</TableCell>
                    <TableCell align="center">Trạng Thái</TableCell>
                    <TableCell align="center">Điểm Danh</TableCell>
                    <TableCell align="center">Hoàn Thành Tiêm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingSchedule ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : schedule.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        Không có dữ liệu lịch tiêm chủng!
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedule.map((row) => (
                      <TableRow key={row.studentId}>
                        <TableCell>{row.studentName}</TableCell>
                        <TableCell>{row.vaccineName}</TableCell>
                        <TableCell align="center">{row.nextDate}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color:
                              row.status === "Done"
                                ? "green"
                                : row.status === "Pending"
                                ? "orange"
                                : "inherit",
                          }}
                        >
                          {row.status === "Done"
                            ? "Hoàn Thành"
                            : row.status === "Pending"
                            ? "Đang Chờ"
                            : row.status}
                        </TableCell>
                        <TableCell align="center">
                          <Select
                            value={attendance[row.studentId] || ""}
                            displayEmpty
                            onChange={(e) =>
                              handleAttendanceChange(
                                row.studentId,
                                e.target.value as "present" | "absent"
                              )
                            }
                            sx={{ minWidth: 100 }}
                          >
                            <MenuItem value="">Chọn</MenuItem>
                            <MenuItem value="present">Có mặt</MenuItem>
                            <MenuItem value="absent">Vắng</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            disabled={row.status === "Done" || !!completingIds[row.studentId]}
                            onClick={() => handleCompleteVaccination(row.studentId)}
                          >
                            {completingIds[row.studentId]
                              ? <CircularProgress size={18} color="inherit"/>
                              : (row.status === "Done" ? "Đã hoàn thành" : "Hoàn thành")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Tab 2: Medicine Requests */}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Đơn Yêu Cầu Sử Dụng Thuốc
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Học Sinh</TableCell>
                    <TableCell>Tên Phụ Huynh</TableCell>
                    <TableCell>Tên Thuốc</TableCell>
                    <TableCell>Liều Dùng</TableCell>
                    <TableCell>Tần Suất</TableCell>
                    <TableCell>Thời Gian</TableCell>
                    <TableCell>Lý Do</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                    <TableCell>Ghi Chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingRequests ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : medicineRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        Không có dữ liệu đơn thuốc!
                      </TableCell>
                    </TableRow>
                  ) : (
                    medicineRequests.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.studentName}</TableCell>
                        <TableCell>{row.parentName}</TableCell>
                        <TableCell>{row.medicineName}</TableCell>
                        <TableCell>{row.dosage}</TableCell>
                        <TableCell>{row.frequency}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.reason}</TableCell>
                        <TableCell sx={{ color: row.status === "Đã Duyệt" ? "green" : "orange" }}>
                          {row.status}
                        </TableCell>
                        <TableCell>{row.note}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}        {/* Tab 3: Health Check Campaigns */}
        {tabValue === 3 && (
          <Box>
            <NurseHealthCheckCampaignList />
          </Box>
        )}

        {/* Tab 4: Medical Incident Management */}
        {tabValue === 4 && <MedicalIncidentManager />}

        {/* Dialog Thêm Vật Tư */}
        <Dialog open={openDialog} onClose={handleDialogClose} disableEscapeKeyDown>
          <DialogTitle>Thêm Vật Tư Y Tế</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Tên Vật Tư"
              name="name"
              fullWidth
              value={newSupply.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Số Lượng"
              name="quantity"
              fullWidth
              type="number"
              value={newSupply.quantity}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Hạn Sử Dụng"
              name="expirationDate"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newSupply.expirationDate}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Vị Trí"
              name="location"
              fullWidth
              value={newSupply.location}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Hủy</Button>
            <Button onClick={handleAddSupply} variant="contained">
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default NurseDashboard;