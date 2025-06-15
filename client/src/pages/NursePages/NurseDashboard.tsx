// Nurse Dashboard Page
import React, { useState } from "react";
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
} from "@mui/material";
import {
  LocalHospital as HospitalIcon,
  Vaccines as VaccineIcon,
  Add as AddIcon,
  Warning as IncidentIcon,
} from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { NurseDashboardProps } from "../../types";
import { ROUTES } from "../../constants";

const NurseDashboard: React.FC<NurseDashboardProps> = ({ onLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSupply, setNewSupply] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    location: "",
  });

  const handleNavigateToHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleNavigateToNews = () => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("school-health-news");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNavigateToContact = () => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
    console.log("New Supply Added:", newSupply);
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
                  </TableCell>
                </TableRow>
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

        {tabValue === 3 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Sự Cố Y Tế
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Học Sinh</TableCell>
                    <TableCell>Sự Kiện</TableCell>
                    <TableCell>Thuốc Đã Sử Dụng</TableCell>
                    <TableCell>Thông Tin Phụ Huynh</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Thao Tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Nguyễn Văn Trọng</TableCell>
                    <TableCell>Sốt cao</TableCell>
                    <TableCell>Paracetamol</TableCell>
                    <TableCell>Nguyễn Văn B</TableCell>
                    <TableCell>0123456789</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Thông Báo Phụ Huynh
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chu Nhật Lâm</TableCell>
                    <TableCell>Viêm họng</TableCell>
                    <TableCell>Amoxicillin</TableCell>
                    <TableCell>Trần Thị C</TableCell>
                    <TableCell>0987654321</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Thông Báo Phụ Huynh
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <Dialog open={openDialog} onClose={undefined} disableEscapeKeyDown>
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
