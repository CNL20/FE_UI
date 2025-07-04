// Nurse Dashboard Page with Medical Incident Management
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
  Badge,
  TablePagination,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  LocalHospital as HospitalIcon,
  Vaccines as VaccineIcon,
  Add as AddIcon,
  Warning as IncidentIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Notifications as NotificationsIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { NurseDashboardProps, Student, MedicalIncident } from "../../types";
import { ROUTES } from "../../constants";
import { 
  searchStudents,
  getStudentMedicalInfo, 
  createMedicalIncident,  getMedicalIncidents,
  notifyParent 
} from "../../services/apiClient";

// Enhanced Medical Incident Management Component with Statistics
const MedicalIncidentManager: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState<MedicalIncident[]>([]);  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<"success" | "error" | "info" | "warning">("info");
    // Enhanced state for filtering and pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    severity: "",
    incidentType: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy] = useState("dateTime");
  const [sortOrder] = useState<"asc" | "desc">("desc");
  // Incident form state
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
  
  // Statistics state
  const [statistics, setStatistics] = useState({
    totalIncidents: 0,
    todayIncidents: 0,
    criticalIncidents: 0,
    resolvedIncidents: 0,
    incidentsByType: {},
    incidentsBySeverity: {},
    weeklyTrend: [],
  });

  const incidentTypes = [
    { value: "injury", label: "Chấn thương" },
    { value: "illness", label: "Bệnh tật" },
    { value: "emergency", label: "Cấp cứu" },
    { value: "allergy", label: "Dị ứng" },
    { value: "other", label: "Khác" },
  ];

  const severityLevels = [
    { value: "low", label: "Thấp", color: "success" },
    { value: "medium", label: "Trung bình", color: "warning" },
    { value: "high", label: "Cao", color: "error" },
    { value: "critical", label: "Nghiêm trọng", color: "error" },
  ];

  const commonSymptoms = [
    "Sốt", "Đau đầu", "Buồn nôn", "Chóng mặt", "Đau bụng", "Ho", "Khó thở", 
    "Phát ban", "Đau khớp", "Mệt mỏi", "Mất ý thức", "Xuất huyết", "Chuột rút"
  ];

  const commonMedications = [
    "Paracetamol", "Ibuprofen", "Băng gạc", "Thuốc sát trùng", "Nước muối sinh lý",
    "Thuốc cầm máu", "Thuốc chống dị ứng", "Oxy", "Thuốc nhỏ mắt", "Thuốc ho"
  ];

  const steps = ["Tìm Học Sinh", "Thông Tin Y Tế", "Ghi Nhận Sự Cố", "Xác Nhận"];  // Search students by name only
  const handleSearchStudents = async (query: string) => {
    if (query.length < 2) {
      setStudents([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await searchStudents(query);
      console.log("Search response:", response);
        // Xử lý response tùy theo cấu trúc dữ liệu từ backend
      let studentData = [];
      if (response?.data) {
        studentData = Array.isArray(response.data) ? response.data : [response.data];
      } else if (Array.isArray(response)) {
        studentData = response;
      } else {
        studentData = [];
      }
      
      // Lọc học sinh theo tên (chỉ tìm theo tên)
      const filteredStudents = studentData.filter((student: any) => {
        const studentName = (student.name || student.fullName || "").toLowerCase();
        const searchTerm = query.toLowerCase();
        return studentName.includes(searchTerm);
      });
        // Chuẩn hóa dữ liệu student từ database
      const normalizedStudents = filteredStudents.map((student: any) => ({
        ...student,
        fullName: student.name || student.fullName, // Sử dụng name từ database
        id: student.studentId || student.id || student.student_code || student.studentCode, // Đảm bảo có id
        student_code: student.studentCode || student.student_code, // Đảm bảo có student_code
      }));
      
      setStudents(normalizedStudents);
      
      if (normalizedStudents.length === 0) {
        setNotificationMessage(`Không tìm thấy học sinh nào có tên "${query}"`);
        setNotificationSeverity("info");
        setShowNotification(true);
      } else {
        setNotificationMessage(`Tìm thấy ${normalizedStudents.length} học sinh có tên "${query}"`);
        setNotificationSeverity("success");
        setShowNotification(true);
      }
    } catch (error: any) {
      console.error("Error searching students:", error);
      setStudents([]);
      setNotificationMessage(`Lỗi tìm kiếm: ${error.message || 'Không thể kết nối đến server'}`);
      setNotificationSeverity("error");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };  // Select student and get medical info
  const handleSelectStudent = async (student: Student) => {
    console.log("Selected student:", student);
    setSelectedStudent(student);
    
    // Fix: Use studentId from database response - check both new and old field names
    const studentId = student.studentId || student.id || student.student_code || student.studentCode;
    const numericStudentId = typeof studentId === 'string' ? parseInt(studentId, 10) : studentId;
    
    if (!numericStudentId || isNaN(numericStudentId)) {
      console.error("Invalid student ID:", studentId, "from student:", student);
      setNotificationMessage("Lỗi: ID học sinh không hợp lệ");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }
    
    setIncidentForm(prev => ({ ...prev, studentId: numericStudentId }));
    
    try {
      const medicalInfo = await getStudentMedicalInfo(numericStudentId.toString());
      // Handle medical history if needed
      console.log("Student medical info:", medicalInfo);
    } catch (error) {
      console.error("Error getting medical info:", error);
    }
    
    setActiveStep(1);
  };
    // Create medical incident
  const handleCreateIncident = async () => {
    // Validation
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
    
    console.log("Creating incident with data:", incidentForm);
    
    setLoading(true);
    try {
      await createMedicalIncident(incidentForm);
      setNotificationMessage("Sự cố y tế đã được ghi nhận thành công!");
      setNotificationSeverity("success");
      setShowNotification(true);
        // Reset form
      setActiveStep(0);
      setSelectedStudent(null);
      setIncidentForm({
        studentId: 0,
        incidentType: "injury",
        description: "",
        symptoms: [],
        severity: "low",
        location: "",        treatmentGiven: "",
        medicationsUsed: [],
        additionalNotes: "",
        parentNotified: false,
      });
      
      // Refresh incidents list
      loadIncidents();    } catch (error: any) {
      console.error("Error creating incident:", error);
      console.error("Detailed error response:", error.response?.data);
      
      let errorMessage = 'Có lỗi xảy ra khi ghi nhận sự cố!';
      
      if (error.response?.data?.errors) {
        // Hiển thị chi tiết validation errors
        const validationErrors = error.response.data.errors;
        const errorDetails = Object.entries(validationErrors)
          .map(([field, messages]: [string, any]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
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
  };

  // Load incidents
  const loadIncidents = async () => {
    try {
      const response = await getMedicalIncidents({
        ...filters,
        sortBy,
        sortOrder,
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
      });
      
      let incidentData = [];
      if (response?.data) {
        incidentData = Array.isArray(response.data) ? response.data : [response.data];
      } else if (Array.isArray(response)) {
        incidentData = response;
      } else {
        incidentData = [];
      }
      
      setIncidents(incidentData);
      calculateStatistics(incidentData);
    } catch (error: any) {
      console.error("Error loading incidents:", error);
      setIncidents([]);
      if (error.response?.status !== 404) {
        setNotificationMessage(`Lỗi tải danh sách sự cố: ${error.message || 'Không thể kết nối đến server'}`);
        setNotificationSeverity("error");
        setShowNotification(true);
      }
    }
  };

  // Notify parent
  const handleNotifyParent = async (incidentId: string) => {
    try {
      await notifyParent(incidentId, { message: "Thông báo về sự cố y tế của con em bạn" });
      setNotificationMessage("Đã thông báo cho phụ huynh!");
      setNotificationSeverity("success");
      setShowNotification(true);
      loadIncidents();
    } catch (error) {
      console.error("Error notifying parent:", error);
      setNotificationMessage("Có lỗi khi thông báo cho phụ huynh!");
      setNotificationSeverity("error");
      setShowNotification(true);
    }
  };

  // Filter and sort handlers
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPage(0); // Reset to first page when filtering
  };

  const handleClearFilters = () => {
    setFilters({
      severity: "",
      incidentType: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
    setPage(0);
  };

  // Pagination handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate statistics from incidents
  const calculateStatistics = useCallback((incidentList: MedicalIncident[]) => {
    const today = new Date().toDateString();
    
    const stats = {
      totalIncidents: incidentList.length,
      todayIncidents: incidentList.filter(incident => 
        new Date(incident.dateTime).toDateString() === today
      ).length,
      criticalIncidents: incidentList.filter(incident => 
        incident.severity === "critical" || incident.severity === "high"
      ).length,
      resolvedIncidents: incidentList.filter(incident => 
        incident.status === "resolved"
      ).length,
      incidentsByType: incidentList.reduce((acc: any, incident) => {
        acc[incident.incidentType] = (acc[incident.incidentType] || 0) + 1;
        return acc;
      }, {}),
      incidentsBySeverity: incidentList.reduce((acc: any, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {}),
      weeklyTrend: [], // Could be calculated based on dates
    };
    
    setStatistics(stats);
  }, []);

  // Statistics Dashboard Component
  const StatisticsDashboard = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {statistics.totalIncidents}
                </Typography>
                <Typography variant="body2">Tổng sự cố</Typography>
              </Box>
              <IncidentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {statistics.todayIncidents}
                </Typography>
                <Typography variant="body2">Hôm nay</Typography>
              </Box>
              <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {statistics.criticalIncidents}
                </Typography>
                <Typography variant="body2">Nghiêm trọng</Typography>
              </Box>
              <HospitalIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {statistics.resolvedIncidents}
                </Typography>
                <Typography variant="body2">Đã giải quyết</Typography>
              </Box>
              <VaccineIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Filters Panel Component
  const FiltersPanel = () => (
    <Accordion expanded={showFilters} onChange={() => setShowFilters(!showFilters)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon />
          <Typography>Bộ lọc tìm kiếm</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Loại sự cố</InputLabel>
              <Select
                value={filters.incidentType}
                onChange={(e) => handleFilterChange('incidentType', e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {incidentTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Mức độ</InputLabel>
              <Select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {severityLevels.map(level => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Từ ngày"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Đến ngày"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={loadIncidents}
                startIcon={<SearchIcon />}
              >
                Áp dụng bộ lọc
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
              >
                Xóa bộ lọc
              </Button>
              <Button 
                variant="outlined" 
                onClick={loadIncidents}
                startIcon={<RefreshIcon />}
              >
                Làm mới
              </Button>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );  useEffect(() => {
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
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "error";
      case "critical": return "error";
      default: return "info";
    }
  };
    return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Quản Lý Sự Cố Y Tế
        </Typography>        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setActiveStep(0)}
            sx={{ textTransform: "none" }}
          >
            Ghi Nhận Sự Cố Mới
          </Button>
        </Box>
      </Box>      {/* Statistics Dashboard */}
      <StatisticsDashboard />      {/* Filters Panel */}
      <FiltersPanel />

      {/* Create New Incident Dialog */}
      <Dialog 
        open={activeStep >= 0} 
        maxWidth="md" 
        fullWidth
        aria-labelledby="incident-dialog-title"
        aria-describedby="incident-dialog-description"
        disablePortal={false}
        keepMounted={false}
        hideBackdrop={false}
        disableEscapeKeyDown={false}
        disableAutoFocus={false}
        disableEnforceFocus={false}
        disableRestoreFocus={false}
        onClose={() => setActiveStep(-1)}
      ><DialogTitle id="incident-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Ghi Nhận Sự Cố Y Tế</Typography>
            <IconButton 
              onClick={() => setActiveStep(-1)}
              aria-label="Đóng dialog"
            >
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
          {activeStep === 0 && (            <Box>
              <Typography variant="h6" gutterBottom>
                Tìm Kiếm Học Sinh Theo Tên
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Hướng dẫn:</strong> Nhập tên học sinh để tìm kiếm. Hệ thống chỉ tìm kiếm theo tên, không bao gồm mã số hay thông tin khác.
                </Typography>
              </Alert>
                <TextField
                fullWidth
                label="Tìm kiếm học sinh theo tên"
                placeholder="Nhập tên học sinh (ví dụ: Nguyễn Văn A)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                }}
                sx={{ mb: 3 }}
                helperText="Nhập ít nhất 2 ký tự để tìm kiếm theo tên học sinh"
              />
              
              {loading && <LinearProgress sx={{ mb: 2 }} />}
              
              {students.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Tìm thấy {students.length} học sinh có tên "{searchQuery}"
                  </Typography>                  <Grid container spacing={2}>
                    {students.map((student, index) => (
                      <Grid item xs={12} md={6} key={`student-${index}-${student.studentId || student.id || student.studentCode || student.student_code}`}>
                        <Card 
                          sx={{ 
                            cursor: "pointer",
                            "&:hover": { 
                              boxShadow: 4,
                              transform: 'translateY(-2px)',
                              transition: 'all 0.2s ease-in-out'
                            }
                          }}
                          onClick={() => handleSelectStudent(student)}
                        >
                          <CardContent>
                            <Typography variant="h6" sx={{ color: 'primary.main' }}>
                              {student.name}
                            </Typography>                            <Typography color="text.secondary">
                              <strong>Mã HS:</strong> {student.studentCode || student.student_code || 'N/A'}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Lớp:</strong> {student.class || 'N/A'}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Trường:</strong> {student.school || 'N/A'}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Nhóm máu:</strong> {student.blood_type || 'N/A'}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
              
              {searchQuery.length >= 2 && students.length === 0 && !loading && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Không tìm thấy học sinh nào có tên "{searchQuery}". Vui lòng thử với tên khác.
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
                      <Typography><strong>Họ tên:</strong> {selectedStudent.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography><strong>Lớp:</strong> {selectedStudent.class}</Typography>
                    </Grid>                    <Grid item xs={12} md={6}>
                      <Typography><strong>Ngày sinh:</strong> {selectedStudent.dob}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography><strong>Nhóm máu:</strong> {selectedStudent.blood_type}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Ghi chú y tế:</strong> {selectedStudent.parent?.emergencyContact || "Không có"}</Typography>
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
                      onChange={(e) => setIncidentForm(prev => ({ ...prev, incidentType: e.target.value as any }))}
                    >
                      {incidentTypes.map(type => (
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
                      onChange={(e) => setIncidentForm(prev => ({ ...prev, severity: e.target.value as any }))}
                    >
                      {severityLevels.map(level => (
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
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, location: e.target.value }))}
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
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chi tiết về sự cố đã xảy ra..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={commonSymptoms}
                    value={incidentForm.symptoms}
                    onChange={(_, newValue) => setIncidentForm(prev => ({ ...prev, symptoms: newValue }))}                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} key={`symptom-${option}-${index}`} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Triệu chứng"
                        placeholder="Chọn hoặc nhập triệu chứng..."
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
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, treatmentGiven: e.target.value }))}
                    placeholder="Mô tả các biện pháp điều trị đã thực hiện..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={commonMedications}
                    value={incidentForm.medicationsUsed}
                    onChange={(_, newValue) => setIncidentForm(prev => ({ ...prev, medicationsUsed: newValue }))}                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} key={`medication-${option}-${index}`} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Thuốc/Vật tư y tế đã sử dụng"
                        placeholder="Chọn hoặc nhập thuốc đã sử dụng..."
                      />
                    )}
                  />
                </Grid>                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Ghi chú thêm"
                    value={incidentForm.additionalNotes}
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Ghi chú thêm (nếu có)..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={incidentForm.parentNotified}
                        onChange={(e) => setIncidentForm(prev => ({ ...prev, parentNotified: e.target.checked }))}
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
                      <Typography variant="subtitle2" color="text.secondary">Học sinh</Typography>
                      <Typography variant="body1">{selectedStudent.name} - {selectedStudent.class}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Loại sự cố</Typography>
                      <Typography variant="body1">
                        {incidentTypes.find(t => t.value === incidentForm.incidentType)?.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Mức độ</Typography>
                      <Chip 
                        label={severityLevels.find(s => s.value === incidentForm.severity)?.label}
                        color={getSeverityColor(incidentForm.severity) as any}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Vị trí</Typography>
                      <Typography variant="body1">{incidentForm.location}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">Mô tả</Typography>
                      <Typography variant="body1">{incidentForm.description}</Typography>
                    </Grid>
                    {incidentForm.symptoms.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Triệu chứng</Typography>                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                          {incidentForm.symptoms.map((symptom, index) => (
                            <Chip key={`symptom-chip-${symptom}-${index}`} label={symptom} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">Điều trị</Typography>
                      <Typography variant="body1">{incidentForm.treatmentGiven}</Typography>
                    </Grid>                    {incidentForm.medicationsUsed.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Thuốc/Vật tư sử dụng</Typography>                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
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
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Incidents List */}
      <Paper sx={{ mt: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6">Danh Sách Sự Cố Y Tế</Typography>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Học sinh</TableCell>
                <TableCell>Loại sự cố</TableCell>
                <TableCell>Mức độ</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
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
                        {incident.studentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {incident.className}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {incidentTypes.find(t => t.value === incident.incidentType)?.label}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={severityLevels.find(s => s.value === incident.severity)?.label}
                      color={getSeverityColor(incident.severity) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(incident.dateTime).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(incident.dateTime).toLocaleTimeString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={incident.status === 'active' ? 'Đang xử lý' : 
                             incident.status === 'resolved' ? 'Đã giải quyết' : 'Cần theo dõi'}
                      color={incident.status === 'resolved' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title={incident.parentNotified ? "Đã thông báo phụ huynh" : "Chưa thông báo phụ huynh"}>
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
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`}
          />
        </TableContainer>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar 
        open={showNotification} 
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowNotification(false)} 
          severity={notificationSeverity}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const NurseDashboard: React.FC<NurseDashboardProps> = ({ onLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSupply, setNewSupply] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    location: "",
  });
  
  const handleNavigateToHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const handleNavigateToNews = useCallback(() => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("school-health-news");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  const handleNavigateToContact = useCallback(() => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSupply((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSupply = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Navbar
        onLogout={onLogout}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToContact={handleNavigateToContact}
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
            <HospitalIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
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
          }}
        >
          <Tab
            icon={<HospitalIcon />}
            label="Vật Tư Y Tế"
            iconPosition="start"
          />
          <Tab
            icon={<VaccineIcon />}
            label="Lịch Tiêm Chủng"
            iconPosition="start"
          />
          <Tab
            icon={<AddIcon />}
            label="Đơn Yêu Cầu Thuốc"
            iconPosition="start"
          />
          <Tab
            icon={<IncidentIcon />}
            label="Sự Cố Y Tế"
            iconPosition="start"
          />
        </Tabs>

        {tabValue === 0 && (
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
                  0
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
        )}

        {tabValue === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Vật Tư</TableCell>
                  <TableCell>Số Lượng</TableCell>
                  <TableCell>Hạn Sử Dụng</TableCell>
                  <TableCell>Thao Tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Băng Gạc</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>2025-12-31</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thuốc Sát Trùng</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell>2025-11-15</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Sửa
                    </Button>
                  </TableCell>                </TableRow>
                <TableRow>
                  <TableCell>Khẩu Trang</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>2026-01-01</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Lịch Tiêm Chủng
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Học Sinh</TableCell>
                    <TableCell>Loại Vắc Xin</TableCell>
                    <TableCell>Tổng Số Mũi</TableCell>
                    <TableCell>Đã Tiêm</TableCell>
                    <TableCell>Ngày Tiêm Tiếp Theo</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Nguyễn Văn A</TableCell>
                    <TableCell>Hepatitis B</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>2024-04-15</TableCell>
                    <TableCell sx={{ color: "orange" }}>Đang Chờ</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Trần Thị B</TableCell>
                    <TableCell>MMR</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2024-03-20</TableCell>
                    <TableCell sx={{ color: "orange" }}>Đang Chờ</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lê Văn C</TableCell>
                    <TableCell>DTaP</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>2024-05-01</TableCell>
                    <TableCell sx={{ color: "green" }}>Hoàn Thành</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

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
                  <TableRow>
                    <TableCell>Nguyễn Văn A</TableCell>
                    <TableCell>Nguyễn Văn B</TableCell>
                    <TableCell>Paracetamol</TableCell>
                    <TableCell>500mg</TableCell>
                    <TableCell>3 lần/ngày</TableCell>
                    <TableCell>2024-03-15 - 2024-03-20</TableCell>
                    <TableCell>Sốt cao</TableCell>
                    <TableCell sx={{ color: "orange" }}>Đang Chờ</TableCell>
                    <TableCell>Uống sau khi ăn</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Trần Thị B</TableCell>
                    <TableCell>Trần Thị C</TableCell>
                    <TableCell>Amoxicillin</TableCell>
                    <TableCell>250mg</TableCell>
                    <TableCell>2 lần/ngày</TableCell>
                    <TableCell>2024-03-14 - 2024-03-21</TableCell>
                    <TableCell>Viêm họng</TableCell>
                    <TableCell sx={{ color: "green" }}>Đã Duyệt</TableCell>
                    <TableCell>Uống trước bữa ăn 30 phút</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabValue === 3 && <MedicalIncidentManager />}

        <Dialog
          open={openDialog}
          onClose={(_event, reason) => {
            if (reason !== "backdropClick") {
              handleDialogClose();
            }
          }}
          disableEscapeKeyDown
        >
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
              value={newSupply.quantity}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Hạn Sử Dụng"
              name="expiryDate"
              fullWidth
              value={newSupply.expiryDate}
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
