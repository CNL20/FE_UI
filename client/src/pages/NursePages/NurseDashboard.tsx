<<<<<<< HEAD
=======
// Nurse Dashboard Page with Medical Incident Management
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
  CircularProgress,
=======
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
import apiClient, {
  searchStudents,
  getStudentMedicalInfo,
  createMedicalIncident,
  getMedicalIncidents,
  notifyParent,
} from "../../services/apiClient";
import { getAssignedCampaignsForNurse } from "../../services/vaccinationService";

// Types
type MedicalSupply = {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
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
=======
import { 
  searchStudents,
  getStudentMedicalInfo, 
  createMedicalIncident,  getMedicalIncidents,
  notifyParent 
} from "../../services/apiClient";

// Enhanced Medical Incident Management Component with Statistics
const MedicalIncidentManager: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [incidents, setIncidents] = useState<MedicalIncident[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] =
    useState<"success" | "error" | "info" | "warning">("info");
=======
  const [incidents, setIncidents] = useState<MedicalIncident[]>([]);  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<"success" | "error" | "info" | "warning">("info");
    // Enhanced state for filtering and pagination
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
=======
  // Incident form state
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD

=======
  
  // Statistics state
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
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
=======
    "Sốt", "Đau đầu", "Buồn nôn", "Chóng mặt", "Đau bụng", "Ho", "Khó thở", 
    "Phát ban", "Đau khớp", "Mệt mỏi", "Mất ý thức", "Xuất huyết", "Chuột rút"
  ];

  const commonMedications = [
    "Paracetamol", "Ibuprofen", "Băng gạc", "Thuốc sát trùng", "Nước muối sinh lý",
    "Thuốc cầm máu", "Thuốc chống dị ứng", "Oxy", "Thuốc nhỏ mắt", "Thuốc ho"
  ];

  const steps = ["Tìm Học Sinh", "Thông Tin Y Tế", "Ghi Nhận Sự Cố", "Xác Nhận"];  // Search students by name only
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
  const handleSearchStudents = async (query: string) => {
    if (query.length < 2) {
      setStudents([]);
      return;
    }
<<<<<<< HEAD

    setLoading(true);
    try {
      const response = await searchStudents(query);
      let studentData = [];
      if (response?.data) {
        studentData = Array.isArray(response.data)
          ? response.data
          : [response.data];
=======
    
    setLoading(true);
    try {
      const response = await searchStudents(query);
      console.log("Search response:", response);
        // Xử lý response tùy theo cấu trúc dữ liệu từ backend
      let studentData = [];
      if (response?.data) {
        studentData = Array.isArray(response.data) ? response.data : [response.data];
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      } else if (Array.isArray(response)) {
        studentData = response;
      } else {
        studentData = [];
      }
<<<<<<< HEAD
      const filteredStudents = studentData.filter((student: any) => {
        const studentName = (
          student.name ||
          student.fullName ||
          ""
        ).toLowerCase();
        const searchTerm = query.toLowerCase();
        return studentName.includes(searchTerm);
      });
      const normalizedStudents = filteredStudents.map((student: any) => ({
        ...student,
        fullName: student.name || student.fullName,
        id:
          student.studentId ||
          student.id ||
          student.student_code ||
          student.studentCode,
        student_code:
          student.studentCode || student.student_code,
      }));

      setStudents(normalizedStudents);

=======
      
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
      
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      if (normalizedStudents.length === 0) {
        setNotificationMessage(`Không tìm thấy học sinh nào có tên "${query}"`);
        setNotificationSeverity("info");
        setShowNotification(true);
      } else {
<<<<<<< HEAD
        setNotificationMessage(
          `Tìm thấy ${normalizedStudents.length} học sinh có tên "${query}"`
        );
=======
        setNotificationMessage(`Tìm thấy ${normalizedStudents.length} học sinh có tên "${query}"`);
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
        setNotificationSeverity("success");
        setShowNotification(true);
      }
    } catch (error: any) {
<<<<<<< HEAD
      setStudents([]);
      setNotificationMessage(
        `Lỗi tìm kiếm: ${error.message || "Không thể kết nối đến server"}`
      );
=======
      console.error("Error searching students:", error);
      setStudents([]);
      setNotificationMessage(`Lỗi tìm kiếm: ${error.message || 'Không thể kết nối đến server'}`);
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      setNotificationSeverity("error");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
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
=======
  };  // Select student and get medical info
  const handleSelectStudent = async (student: Student) => {
    console.log("Selected student:", student);
    setSelectedStudent(student);
    
    // Fix: Use studentId from database response - check both new and old field names
    const studentId = student.studentId || student.id || student.student_code || student.studentCode;
    const numericStudentId = typeof studentId === 'string' ? parseInt(studentId, 10) : studentId;
    
    if (!numericStudentId || isNaN(numericStudentId)) {
      console.error("Invalid student ID:", studentId, "from student:", student);
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      setNotificationMessage("Lỗi: ID học sinh không hợp lệ");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }
<<<<<<< HEAD

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
=======
    
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    if (!incidentForm.studentId || incidentForm.studentId === 0) {
      setNotificationMessage("Lỗi: Chưa chọn học sinh!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    if (!incidentForm.description.trim()) {
      setNotificationMessage("Lỗi: Vui lòng nhập mô tả sự cố!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    if (!incidentForm.location.trim()) {
      setNotificationMessage("Lỗi: Vui lòng nhập vị trí xảy ra sự cố!");
      setNotificationSeverity("error");
      setShowNotification(true);
      return;
    }
<<<<<<< HEAD

=======
    
    console.log("Creating incident with data:", incidentForm);
    
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    setLoading(true);
    try {
      await createMedicalIncident(incidentForm);
      setNotificationMessage("Sự cố y tế đã được ghi nhận thành công!");
      setNotificationSeverity("success");
      setShowNotification(true);
<<<<<<< HEAD
      setActiveStep(-1);
=======
        // Reset form
      setActiveStep(0);
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      setSelectedStudent(null);
      setIncidentForm({
        studentId: 0,
        incidentType: "injury",
        description: "",
        symptoms: [],
        severity: "low",
<<<<<<< HEAD
        location: "",
        treatmentGiven: "",
=======
        location: "",        treatmentGiven: "",
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
        medicationsUsed: [],
        additionalNotes: "",
        parentNotified: false,
      });
<<<<<<< HEAD
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
=======
      
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
        errorMessage = `Lỗi validation: ${errorDetails}`;
      } else if (error.response?.data?.title) {
        errorMessage = error.response.data.title;
      } else if (error.message) {
        errorMessage = error.message;
      }
<<<<<<< HEAD
=======
      
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      setNotificationMessage(errorMessage);
      setNotificationSeverity("error");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  // Load incidents
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
  const loadIncidents = async () => {
    try {
      const response = await getMedicalIncidents({
        ...filters,
        sortBy,
        sortOrder,
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
      });
<<<<<<< HEAD

      let incidentData = [];
      if (response?.data) {
        incidentData = Array.isArray(response.data)
          ? response.data
          : [response.data];
=======
      
      let incidentData = [];
      if (response?.data) {
        incidentData = Array.isArray(response.data) ? response.data : [response.data];
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      } else if (Array.isArray(response)) {
        incidentData = response;
      } else {
        incidentData = [];
      }
<<<<<<< HEAD

      setIncidents(incidentData);
      calculateStatistics(incidentData);
    } catch (error: any) {
      setIncidents([]);
      if (error.response?.status !== 404) {
        setNotificationMessage(
          `Lỗi tải danh sách sự cố: ${error.message || "Không thể kết nối đến server"}`
        );
=======
      
      setIncidents(incidentData);
      calculateStatistics(incidentData);
    } catch (error: any) {
      console.error("Error loading incidents:", error);
      setIncidents([]);
      if (error.response?.status !== 404) {
        setNotificationMessage(`Lỗi tải danh sách sự cố: ${error.message || 'Không thể kết nối đến server'}`);
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
        setNotificationSeverity("error");
        setShowNotification(true);
      }
    }
  };

<<<<<<< HEAD
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
    setShowNotification(true);
  }
};

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setPage(0);
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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

<<<<<<< HEAD
=======
  // Pagination handlers
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

<<<<<<< HEAD
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
=======
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      ).length,
      incidentsByType: incidentList.reduce((acc: any, incident) => {
        acc[incident.incidentType] = (acc[incident.incidentType] || 0) + 1;
        return acc;
      }, {}),
      incidentsBySeverity: incidentList.reduce((acc: any, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {}),
<<<<<<< HEAD
      weeklyTrend: [],
    };

    setStatistics(stats);
  }, []);

  const StatisticsDashboard = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                  {statistics.totalIncidents}
                </Typography>
                <Typography variant="body2">Tổng sự cố</Typography>
              </Box>
              <IncidentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
<<<<<<< HEAD
      <Grid item xs={12} md={3}>
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
=======
      
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                  {statistics.todayIncidents}
                </Typography>
                <Typography variant="body2">Hôm nay</Typography>
              </Box>
              <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
<<<<<<< HEAD
      <Grid item xs={12} md={3}>
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
=======
      
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                  {statistics.criticalIncidents}
                </Typography>
                <Typography variant="body2">Nghiêm trọng</Typography>
              </Box>
              <HospitalIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
<<<<<<< HEAD
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: "success.main", color: "white" }}>
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
=======
      
      <Grid item xs={12} md={3}>
        <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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

<<<<<<< HEAD
  const FiltersPanel = () => (
    <Accordion
      expanded={showFilters}
      onChange={() => setShowFilters(!showFilters)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
=======
  // Filters Panel Component
  const FiltersPanel = () => (
    <Accordion expanded={showFilters} onChange={() => setShowFilters(!showFilters)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
                onChange={(e) =>
                  handleFilterChange("incidentType", e.target.value)
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {incidentTypes.map((type) => (
=======
                onChange={(e) => handleFilterChange('incidentType', e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {incidentTypes.map(type => (
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
<<<<<<< HEAD
=======
          
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Mức độ</InputLabel>
              <Select
                value={filters.severity}
<<<<<<< HEAD
                onChange={(e) =>
                  handleFilterChange("severity", e.target.value)
                }
              >
                <MenuItem value="">Tất cả</MenuItem>
                {severityLevels.map((level) => (
=======
                onChange={(e) => handleFilterChange('severity', e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {severityLevels.map(level => (
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
<<<<<<< HEAD
=======
          
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Từ ngày"
              value={filters.dateFrom}
<<<<<<< HEAD
              onChange={(e) =>
                handleFilterChange("dateFrom", e.target.value)
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
=======
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Đến ngày"
              value={filters.dateTo}
<<<<<<< HEAD
              onChange={(e) =>
                handleFilterChange("dateTo", e.target.value)
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
=======
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                onClick={loadIncidents}
                startIcon={<SearchIcon />}
              >
                Áp dụng bộ lọc
              </Button>
<<<<<<< HEAD
              <Button variant="outlined" onClick={handleClearFilters}>
                Xóa bộ lọc
              </Button>
              <Button
                variant="outlined"
=======
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
              >
                Xóa bộ lọc
              </Button>
              <Button 
                variant="outlined" 
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
  );

  useEffect(() => {
=======
  );  useEffect(() => {
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    loadIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy, sortOrder, page, rowsPerPage]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        handleSearchStudents(searchQuery);
      }
    }, 300);
<<<<<<< HEAD

=======
    
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setActiveStep(0)}
            sx={{ textTransform: "none" }}
          >
            Ghi Nhận Sự Cố Mới
          </Button>
        </Box>
<<<<<<< HEAD
      </Box>
      <StatisticsDashboard />
      <FiltersPanel />

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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
        <DialogContent id="incident-dialog-description">
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
<<<<<<< HEAD
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
=======

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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                fullWidth
                label="Tìm kiếm học sinh theo tên"
                placeholder="Nhập tên học sinh (ví dụ: Nguyễn Văn A)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
<<<<<<< HEAD
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
=======
                  startAdornment: <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                }}
                sx={{ mb: 3 }}
                helperText="Nhập ít nhất 2 ký tự để tìm kiếm theo tên học sinh"
              />
<<<<<<< HEAD
              {loading && <LinearProgress sx={{ mb: 2 }} />}
=======
              
              {loading && <LinearProgress sx={{ mb: 2 }} />}
              
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
              {students.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Tìm thấy {students.length} học sinh có tên "{searchQuery}"
<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                          }}
                          onClick={() => handleSelectStudent(student)}
                        >
                          <CardContent>
<<<<<<< HEAD
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
                              <strong>Trường:</strong> {student.school || "N/A"}
                            </Typography>
                            <Typography color="text.secondary">
                              <strong>Nhóm máu:</strong> {student.blood_type || "N/A"}
                            </Typography>
                            <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
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
=======
              
              {searchQuery.length >= 2 && students.length === 0 && !loading && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Không tìm thấy học sinh nào có tên "{searchQuery}". Vui lòng thử với tên khác.
                  </Typography>
                </Alert>
              )}
            </Box>
          )}

>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
<<<<<<< HEAD
=======
              
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setActiveStep(0)}>Quay lại</Button>
                <Button variant="contained" onClick={() => setActiveStep(2)}>
                  Tiếp tục
                </Button>
              </Box>
            </Box>
          )}
<<<<<<< HEAD
=======

>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          {/* Step 3: Incident Form */}
          {activeStep === 2 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Loại sự cố</InputLabel>
                    <Select
                      value={incidentForm.incidentType}
<<<<<<< HEAD
                      onChange={(e) =>
                        setIncidentForm((prev) => ({
                          ...prev,
                          incidentType: e.target.value as any,
                        }))
                      }
                    >
                      {incidentTypes.map((type) => (
=======
                      onChange={(e) => setIncidentForm(prev => ({ ...prev, incidentType: e.target.value as any }))}
                    >
                      {incidentTypes.map(type => (
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
<<<<<<< HEAD
=======
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Mức độ nghiêm trọng</InputLabel>
                    <Select
                      value={incidentForm.severity}
<<<<<<< HEAD
                      onChange={(e) =>
                        setIncidentForm((prev) => ({
                          ...prev,
                          severity: e.target.value as any,
                        }))
                      }
                    >
                      {severityLevels.map((level) => (
=======
                      onChange={(e) => setIncidentForm(prev => ({ ...prev, severity: e.target.value as any }))}
                    >
                      {severityLevels.map(level => (
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
<<<<<<< HEAD
=======
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vị trí xảy ra sự cố"
                    value={incidentForm.location}
<<<<<<< HEAD
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Ví dụ: Sân chơi, lớp học, phòng y tế..."
                  />
                </Grid>
=======
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ví dụ: Sân chơi, lớp học, phòng y tế..."
                  />
                </Grid>
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Mô tả sự cố"
                    value={incidentForm.description}
<<<<<<< HEAD
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Mô tả chi tiết về sự cố đã xảy ra..."
                  />
                </Grid>
=======
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chi tiết về sự cố đã xảy ra..."
                  />
                </Grid>
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={commonSymptoms}
                    value={incidentForm.symptoms}
<<<<<<< HEAD
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
=======
                    onChange={(_, newValue) => setIncidentForm(prev => ({ ...prev, symptoms: newValue }))}                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} key={`symptom-${option}-${index}`} />
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
<<<<<<< HEAD
                        id={params.id}
                        InputProps={params.InputProps}
                        inputProps={params.inputProps}
                        label="Triệu chứng"
                        placeholder="Chọn hoặc nhập triệu chứng..."
                        size="small"
                        variant="outlined"
=======
                        {...params}
                        label="Triệu chứng"
                        placeholder="Chọn hoặc nhập triệu chứng..."
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                      />
                    )}
                  />
                </Grid>
<<<<<<< HEAD
=======
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Điều trị đã thực hiện"
                    value={incidentForm.treatmentGiven}
<<<<<<< HEAD
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        treatmentGiven: e.target.value,
                      }))
                    }
                    placeholder="Mô tả các biện pháp điều trị đã thực hiện..."
                  />
                </Grid>
=======
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, treatmentGiven: e.target.value }))}
                    placeholder="Mô tả các biện pháp điều trị đã thực hiện..."
                  />
                </Grid>
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={commonMedications}
                    value={incidentForm.medicationsUsed}
<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Ghi chú thêm"
                    value={incidentForm.additionalNotes}
<<<<<<< HEAD
                    onChange={(e) =>
                      setIncidentForm((prev) => ({
                        ...prev,
                        additionalNotes: e.target.value,
                      }))
                    }
                    placeholder="Ghi chú thêm (nếu có)..."
                  />
                </Grid>
=======
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Ghi chú thêm (nếu có)..."
                  />
                </Grid>
                
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={incidentForm.parentNotified}
<<<<<<< HEAD
                        onChange={(e) =>
                          setIncidentForm((prev) => ({
                            ...prev,
                            parentNotified: e.target.checked,
                          }))
                        }
=======
                        onChange={(e) => setIncidentForm(prev => ({ ...prev, parentNotified: e.target.checked }))}
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                      />
                    }
                    label="Đã thông báo cho phụ huynh"
                  />
                </Grid>
              </Grid>
<<<<<<< HEAD
=======
              
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button onClick={() => setActiveStep(1)}>Quay lại</Button>
                <Button variant="contained" onClick={() => setActiveStep(3)}>
                  Xem trước
                </Button>
              </Box>
            </Box>
          )}
<<<<<<< HEAD
=======

>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          {/* Step 4: Confirmation */}
          {activeStep === 3 && selectedStudent && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Xác Nhận Thông Tin
              </Typography>
<<<<<<< HEAD
=======
              
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                        color={getSeverityColor(incidentForm.severity) as any}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
<<<<<<< HEAD
                      <Typography variant="subtitle2" color="text.secondary">
                        Vị trí
                      </Typography>
                      <Typography variant="body1">{incidentForm.location}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Mô tả
                      </Typography>
=======
                      <Typography variant="subtitle2" color="text.secondary">Vị trí</Typography>
                      <Typography variant="body1">{incidentForm.location}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">Mô tả</Typography>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                      <Typography variant="body1">{incidentForm.description}</Typography>
                    </Grid>
                    {incidentForm.symptoms.length > 0 && (
                      <Grid item xs={12}>
<<<<<<< HEAD
                        <Typography variant="subtitle2" color="text.secondary">
                          Triệu chứng
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
=======
                        <Typography variant="subtitle2" color="text.secondary">Triệu chứng</Typography>                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                          {incidentForm.symptoms.map((symptom, index) => (
                            <Chip key={`symptom-chip-${symptom}-${index}`} label={symptom} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12}>
<<<<<<< HEAD
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
=======
                      <Typography variant="subtitle2" color="text.secondary">Điều trị</Typography>
                      <Typography variant="body1">{incidentForm.treatmentGiven}</Typography>
                    </Grid>                    {incidentForm.medicationsUsed.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Thuốc/Vật tư sử dụng</Typography>                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
                          {incidentForm.medicationsUsed.map((med, index) => (
                            <Chip key={`medication-chip-${med}-${index}`} label={med} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
<<<<<<< HEAD
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setActiveStep(2)}>Quay lại</Button>
                <Button
                  variant="contained"
=======
              
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setActiveStep(2)}>Quay lại</Button>
                <Button 
                  variant="contained" 
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
=======

      {/* Enhanced Incidents List */}
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
      <Paper sx={{ mt: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6">Danh Sách Sự Cố Y Tế</Typography>
        </Box>
<<<<<<< HEAD
=======
        
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
<<<<<<< HEAD
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
                      {incidentTypes.find((t) => t.value === incident.incidentType)?.label}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={severityLevels.find((s) => s.value === incident.severity)?.label}
                        color={getSeverityColor(incident.severity) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(incident.dateTime).toLocaleDateString("vi-VN")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(incident.dateTime).toLocaleTimeString("vi-VN")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          incident.status === "active"
                            ? "Đang xử lý"
                            : incident.status === "resolved"
                            ? "Đã giải quyết"
                            : "Cần theo dõi"
                        }
                        color={incident.status === "resolved" ? "success" : "warning"}
                        size="small"
                      />
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
=======
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
          
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={incidents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng mỗi trang:"
<<<<<<< HEAD
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
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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

  // State: Medical Supplies
  const [supplies, setSupplies] = useState<MedicalSupply[]>([]);
  const [loadingSupplies, setLoadingSupplies] = useState(false);

  // State: Add Medical Supply Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [newSupply, setNewSupply] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    location: "",
  });
<<<<<<< HEAD

  // State: Vaccination Campaigns assigned to nurse
  const [assignedCampaigns, setAssignedCampaigns] = useState<AssignedCampaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

  // State: Vaccination Schedule
  const [schedule, setSchedule] = useState<VaccinationSchedule[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  // State: Attendance
  const [attendance, setAttendance] = useState<{ [studentId: number]: "present" | "absent" | undefined }>({});
  const [savingAttendance, setSavingAttendance] = useState(false);
=======
  
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9

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
  }, [tabValue]);

  // Load Vaccination Schedule cho campaign đã chọn
  useEffect(() => {
    if (tabValue === 1 && selectedCampaignId) {
      setLoadingSchedule(true);
      apiClient
        .get(`/vaccination/campaigns/${selectedCampaignId}/schedule`)
        .then((res: any) => {
          setSchedule(res.data || []);
          const initialAttendance: { [studentId: number]: "present" | "absent" | undefined } = {};
          (res.data || []).forEach((item: VaccinationSchedule) => {
            initialAttendance[item.studentId] = undefined;
          });
          setAttendance(initialAttendance);
        })
        .catch(() => {
          setSchedule([]);
          setAttendance({});
        })
        .finally(() => setLoadingSchedule(false));
    }
  }, [tabValue, selectedCampaignId]);
  // Load Medicine Requests
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
        expiryDate: newSupply.expiryDate,
        location: newSupply.location,
      })
      .then(() => {
        setOpenDialog(false);
        setNewSupply({
          name: "",
          quantity: "",
          expiryDate: "",
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
        .map(([studentId, status]) => ({
          studentId: Number(studentId),
          nurseId,
          present: status === "present",
        }));
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
    <>
      <Navbar
        onLogout={onLogout}
        onNavigateToHome={() => navigate(ROUTES.HOME)}
        onNavigateToNews={() => navigate(ROUTES.HOME)}
        onNavigateToContact={() => navigate(ROUTES.HOME)}
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
          }}
        >
          <Tab icon={<HospitalIcon />} label="Vật Tư Y Tế" iconPosition="start" />
          <Tab icon={<VaccineIcon />} label="Lịch Tiêm Chủng" iconPosition="start" />
          <Tab icon={<AddIcon />} label="Đơn Yêu Cầu Thuốc" iconPosition="start" />
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
<<<<<<< HEAD
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
                    <TableCell>Hạn Sử Dụng</TableCell>
                    <TableCell>Vị Trí</TableCell>
                    <TableCell>Thao Tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingSupplies ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : supplies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Không có dữ liệu vật tư y tế!
                      </TableCell>
                    </TableRow>
                  ) : (
                    supplies.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.expiryDate}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" size="small">
                            Sửa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
=======
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
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
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
        )}

<<<<<<< HEAD
        {/* Tab 3: Medical Incident Management */}
=======
>>>>>>> 1ea54a1325b7dda4469047d68f497fca416a24d9
        {tabValue === 3 && <MedicalIncidentManager />}

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
              name="expiryDate"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
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