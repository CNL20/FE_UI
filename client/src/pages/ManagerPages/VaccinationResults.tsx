import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { notifyParentsVaccination, getVaccinationResults } from "../../services/vaccinationService";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { VaccinationRecord } from "../../types/vaccination";

const VaccinationResults: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<VaccinationRecord[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);

  // Lấy kết quả tiêm chủng của campaign
  useEffect(() => {
    if (!id) return;
    setResultsLoading(true);
    getVaccinationResults(Number(id))
      .then((data) => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setResultsLoading(false));
  }, [id]);

  const handleNotify = async () => {
    if (!id) return;
    setNotifyLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await notifyParentsVaccination(Number(id));
      setSuccess("Đã gửi thông báo tới phụ huynh!");
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra!");
    } finally {
      setNotifyLoading(false);
    }
  };

  if (!id)
    return (
      <Box p={3}>
        <Typography color="error">Thiếu mã chiến dịch!</Typography>
      </Box>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Kết quả tiêm chủng
      </Typography>
      {/* Bảng kết quả */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Học sinh</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Loại vaccine</TableCell>
              <TableCell>Ngày tiêm</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultsLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không có dữ liệu!
                </TableCell>
              </TableRow>
            ) : (
              results.map((row) => (
                <TableRow key={row.studentId}>
                  <TableCell>{row.student?.name}</TableCell>
                  <TableCell>{row.student?.class}</TableCell>
                  <TableCell>{row.vaccineName}</TableCell>
                  <TableCell>
                    {row.dateOfVaccination
                      ? new Date(row.dateOfVaccination).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.status === "Done"
                          ? "green"
                          : row.status === "Pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {row.status === "Done"
                      ? "Hoàn thành"
                      : row.status === "Pending"
                      ? "Đang chờ"
                      : row.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Nút gửi thông báo */}
      <Button variant="contained" onClick={handleNotify} disabled={notifyLoading}>
        {notifyLoading ? "Đang gửi..." : "Gửi thông báo cho phụ huynh"}
      </Button>
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default VaccinationResults;