import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from "@mui/material";
import { getMedicalIncidents } from "../../services/apiClient";

const IncidentTestPage: React.FC = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadIncidents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMedicalIncidents({});
      console.log("🔍 Test Page - Raw API Response:", response);
      setIncidents(response || []);
    } catch (err: any) {
      console.error("🔍 Test Page - Error:", err);
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const incidentTypes = [
    { value: "injury", label: "Chấn thương" },
    { value: "illness", label: "Bệnh tật" },
    { value: "emergency", label: "Cấp cứu" },
    { value: "allergy", label: "Dị ứng" },
    { value: "other", label: "Khác" },
  ];

  const severityLevels = [
    { value: "low", label: "Thấp" },
    { value: "medium", label: "Trung bình" },
    { value: "high", label: "Cao" },
    { value: "critical", label: "Nghiêm trọng" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🧪 Test Medical Incidents API
      </Typography>
      
      <Button variant="contained" onClick={loadIncidents} disabled={loading} sx={{ mb: 3 }}>
        {loading ? "Đang tải..." : "Tải lại dữ liệu"}
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Lỗi: {error}
        </Alert>
      )}
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          📊 <strong>Tổng số incidents:</strong> {incidents.length}<br/>
          🔍 <strong>Debug:</strong> Mở Developer Tools (F12) để xem console logs chi tiết
        </Typography>
      </Alert>
      
      <Paper sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Incident Type (Raw)</TableCell>
                <TableCell>Incident Type (Mapped)</TableCell>
                <TableCell>Severity (Raw)</TableCell>
                <TableCell>Severity (Mapped)</TableCell>
                <TableCell>Date Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    {loading ? "Đang tải..." : "Không có dữ liệu"}
                  </TableCell>
                </TableRow>
              ) : (
                incidents.map((incident, index) => (
                  <TableRow key={incident.id || index}>
                    <TableCell>{incident.id || "N/A"}</TableCell>
                    <TableCell>{incident.studentName || "N/A"}</TableCell>
                    <TableCell>{incident.className || "N/A"}</TableCell>
                    <TableCell>
                      <code>{incident.incidentType || "N/A"}</code>
                    </TableCell>
                    <TableCell>
                      <strong>
                        {incidentTypes.find(t => t.value === incident.incidentType)?.label || "❌ KHÔNG TÌM THẤY"}
                      </strong>
                    </TableCell>
                    <TableCell>
                      <code>{incident.severity || "N/A"}</code>
                    </TableCell>
                    <TableCell>
                      <strong>
                        {severityLevels.find(s => s.value === incident.severity)?.label || "❌ KHÔNG TÌM THẤY"}
                      </strong>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        try {
                          const date = new Date(incident.dateTime);
                          return isNaN(date.getTime()) ? "❌ Invalid Date" : date.toLocaleString("vi-VN");
                        } catch {
                          return "❌ Parse Error";
                        }
                      })()}
                    </TableCell>
                    <TableCell>{incident.status || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {incidents.length > 0 && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔍 Raw Data Sample (First incident):
          </Typography>
          <pre style={{ fontSize: '12px', overflow: 'auto', backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '4px' }}>
            {JSON.stringify(incidents[0], null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default IncidentTestPage;
