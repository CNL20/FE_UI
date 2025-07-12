import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

interface Consent {
  studentId: number;
  studentName: string;
  class: string;
  parentName: string | null;
  consentStatus: boolean | null;
  consentDate: string | null;
  notes?: string | null;
}

const API_URL = process.env['REACT_APP_API_URL'] || "http://localhost:5000";

const CampaignConsents: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [consents, setConsents] = useState<Consent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConsents = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/api/vaccination/campaigns/${campaignId}/consents`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data: Consent[] = await res.json();
        setConsents(data);
      }
      setLoading(false);
    };
    if (campaignId) fetchConsents();
  }, [campaignId]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Danh sách xác nhận tiêm chủng của chiến dịch
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Học sinh</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Phụ huynh</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày xác nhận</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : consents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có dữ liệu xác nhận nào cho chiến dịch này.
                </TableCell>
              </TableRow>
            ) : (
              consents.map((c) => (
                <TableRow key={c.studentId}>
                  <TableCell>{c.studentName}</TableCell>
                  <TableCell>{c.class}</TableCell>
                  <TableCell>{c.parentName}</TableCell>
                  <TableCell>
                    {c.consentStatus === null ? (
                      <span style={{ color: "gray" }}>Chưa xác nhận</span>
                    ) : c.consentStatus ? (
                      <span style={{ color: "green" }}>Đồng ý</span>
                    ) : (
                      <span style={{ color: "red" }}>Không đồng ý</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {c.consentDate
                      ? new Date(c.consentDate).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell>{c.notes || ""}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CampaignConsents;