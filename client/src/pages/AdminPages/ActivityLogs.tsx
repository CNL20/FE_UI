import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { Search, AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ActivityLogs: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
  };

  const handleRowClick = (log: any) => {
    if (log) {
      setModalOpen(true);
    }
  };

  const handleBackClick = () => {
    navigate("/admin"); // Chuyển về trang AdminDashboard khi nhấn nút Quay lại
  };

  // Updated styling for better aesthetics
  const modalStyle = {
    padding: "20px",
    backgroundColor: "#ffffff",
    margin: "50px auto",
    maxWidth: "500px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    border: "1px solid #e0e0e0",
  };

  const modalHeaderStyle = {
    color: "#1e88e5",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const modalTextStyle = {
    color: "#555",
    fontSize: "16px",
    marginBottom: "8px",
  };

  const modalButtonStyle = {
    backgroundColor: "#1e88e5",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    textTransform: "none" as "none",
  };

  const tableCellStyle = {
    fontWeight: "bold",
    color: "#333",
  };

  const statusIndicatorStyle = (status: "active" | "inactive") => ({
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: status === "active" ? "#4caf50" : "#f44336",
  });

  return (
    <>
      <Navbar {...(onLogout ? { onLogout } : {})} />
      <div style={{ padding: "20px" }}>
        {/* Header */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTime style={{ marginRight: "10px" }} /> Nhật ký hoạt động
          </h1>
        </div>

        {/* Search and Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tên người dùng, email, từ khoá..."
            style={{ flex: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<Search />}
          >
            Tìm kiếm
          </Button>
        </div>

        {/* Data Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={tableCellStyle}>Thời gian</TableCell>
                <TableCell style={tableCellStyle}>Người dùng</TableCell>
                <TableCell style={tableCellStyle}>Chi tiết</TableCell>
                <TableCell style={tableCellStyle}>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Example Row */}
              <TableRow style={{ cursor: "pointer", backgroundColor: "#f1f1f1" }}>
                <TableCell>09/06/2025 14:30</TableCell>
                <TableCell>User1</TableCell>
                <TableCell>
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "#1e88e5",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick({ id: 1 })}
                  >
                    Tóm tắt chi tiết...
                  </span>
                </TableCell>
                <TableCell>
                  <div style={statusIndicatorStyle("active")}></div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal */}
        <Modal
          open={modalOpen}
          onClose={(_event, reason) => {
            if (reason !== "backdropClick") {
              setModalOpen(false);
            }
          }}
        >
          <Box style={modalStyle}>
            <h2 style={modalHeaderStyle}>Chi tiết nhật ký</h2>
            <p style={modalTextStyle}>Thời gian: 09/06/2025 14:30</p>
            <p style={modalTextStyle}>IP: 192.168.1.1</p>
            <p style={modalTextStyle}>Thiết bị: Chrome on Windows</p>
            <p style={modalTextStyle}>Địa chỉ: Hà Nội, Việt Nam</p>
            <p style={modalTextStyle}>Dữ liệu trước: ...</p>
            <p style={modalTextStyle}>Dữ liệu sau: ...</p>
            <Button
              variant="contained"
              style={modalButtonStyle}
              onClick={() => setModalOpen(false)}
            >
              Đóng
            </Button>
          </Box>
        </Modal>

        {/* Back Button */}
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackClick}
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              marginTop: "20px",
            }}
          >
            Quay lại
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActivityLogs;