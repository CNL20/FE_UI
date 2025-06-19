import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  Button,
  Snackbar,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Typography,
} from "@mui/material";
import {
  Edit,
  Delete,
  Search,
  Add,
  Close,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

interface Account {
  id: number;
  name: string;
  role: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ManageAccounts: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const accounts: Account[] = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      role: "Quản trị viên",
      email: "nguyenvana@example.com",
      status: "Hoạt động",
      createdAt: "2025-01-01",
      updatedAt: "2025-06-01",
    },
    {
      id: 2,
      name: "Trần Thị B",
      role: "Quản lý",
      email: "tranthib@example.com",
      status: "Không hoạt động",
      createdAt: "2025-02-01",
      updatedAt: "2025-06-02",
    },
    // ...thêm tài khoản khác
  ];

  const filteredAccounts: Account[] = accounts.filter((account) =>
    account.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleBackClick = () => {
    navigate("/admin"); // Chuyển về trang AdminDashboard khi nhấn nút Quay lại
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#1976d2",
          fontWeight: "bold",
        }}
      >
        Quản lý tài khoản
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm theo tên, email, vai trò..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          style={{ width: "70%" }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
          style={{ borderRadius: "5px", padding: "10px 20px" }}
        >
          Tạo tài khoản mới
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2", color: "#ffffff" }}>
            <TableRow>
              <TableCell padding="none" />
              <TableCell align="center" style={{ color: "#ffffff" }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Tên
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Vai trò
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Email
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Trạng thái
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Ngày tạo
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Ngày cập nhật
              </TableCell>
              <TableCell align="center" style={{ color: "#ffffff" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow
                key={account.id}
                hover
                style={{ transition: "background-color 0.3s" }}
              >
                <TableCell padding="none" />
                <TableCell align="center">{account.id}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Xem chi tiết tài khoản">
                    <span style={{ cursor: "pointer", color: "#1976d2" }}>
                      {account.name}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Select value={account.role} style={{ width: "100px" }}>
                    <MenuItem value="Quản trị viên">Quản trị viên</MenuItem>
                    <MenuItem value="Quản lý">Quản lý</MenuItem>
                    <MenuItem value="Y tá">Y tá</MenuItem>
                    <MenuItem value="Phụ huynh">Phụ huynh</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">{account.email}</TableCell>
                <TableCell align="center">
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor:
                        account.status === "Hoạt động" ? "#4caf50" : "#f44336",
                    }}
                  ></span>
                </TableCell>
                <TableCell align="center">{account.createdAt}</TableCell>
                <TableCell align="center">{account.updatedAt}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Chỉnh sửa tài khoản">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa tài khoản">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredAccounts.length / 10)}
        page={page}
        onChange={handlePageChange}
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      />
      <Dialog
        open={isDialogOpen}
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            handleDialogClose();
          }
        }}
        disableEscapeKeyDown
        PaperProps={{
          style: {
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to right, #ffffff, #e3f2fd)",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
          Tạo tài khoản mới
        </DialogTitle>
        <DialogContent style={{ padding: "20px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <TextField
              label="Họ tên"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel id="role-label">Vai trò</InputLabel>
            <Select
              labelId="role-label"
              label="Vai trò"
              variant="outlined"
              fullWidth
              margin="dense"
            >
              <MenuItem value="Y tá">Y tá</MenuItem>
              <MenuItem value="Quản lý">Quản lý</MenuItem>
            </Select>
            <TextField
              label="Tên đăng nhập"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleDialogClose}
            color="inherit"
            startIcon={<Close />}
            style={{ borderRadius: "5px", padding: "10px 20px" }}
          >
            Huỷ
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setSnackbar({
                open: true,
                message: "Tạo tài khoản thành công!",
                severity: "success",
              });
              handleDialogClose();
            }}
            style={{ borderRadius: "5px", padding: "10px 20px" }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          padding: "15px 20px",
          background: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          style={{ borderRadius: "5px", padding: "10px 20px" }}
        >
          Quay lại
        </Button>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flex: "1",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 15px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "#e3f2fd",
            }}
          >
            <PeopleIcon
              style={{
                color: "#1976d2",
                fontSize: "40px",
                marginRight: "10px",
              }}
            />
            <div>
              <Typography
                variant="h6"
                style={{ margin: 0, fontWeight: "bold" }}
              >
                {accounts.length}
              </Typography>
              <Typography variant="body2">Tổng số tài khoản</Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 15px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "#e8f5e9",
            }}
          >
            <CheckCircleIcon
              style={{
                color: "#4caf50",
                fontSize: "40px",
                marginRight: "10px",
              }}
            />
            <div>
              <Typography
                variant="h6"
                style={{ margin: 0, fontWeight: "bold" }}
              >
                {
                  accounts.filter((account) => account.status === "Hoạt động")
                    .length
                }
              </Typography>
              <Typography variant="body2">Hoạt động</Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 15px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "#ffebee",
            }}
          >
            <CancelIcon
              style={{
                color: "#f44336",
                fontSize: "40px",
                marginRight: "10px",
              }}
            />
            <div>
              <Typography
                variant="h6"
                style={{ margin: 0, fontWeight: "bold" }}
              >
                {
                  accounts.filter(
                    (account) => account.status === "Không hoạt động"
                  ).length
                }
              </Typography>
              <Typography variant="body2">Không hoạt động</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccounts;
