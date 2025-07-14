import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assignNurseToCampaign } from "../../services/vaccinationService";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";

interface Nurse {
  nurseId: number;
  name: string;
}

const AssignNurse: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [nurseId, setNurseId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/health-check/school-staff")
      .then(res => {
        setNurses(res.data || []);
        // CHỈ set nurseId nếu chưa chọn ai
        if ((res.data && res.data.length > 0) && nurseId === 0) {
          setNurseId(res.data[0].nurseId);
        }
      })
      .catch(() => setError("Không thể lấy danh sách nhân viên y tế!"));
    // Để dependency là [] để không reset nurseId mỗi lần render lại
    // eslint-disable-next-line
  }, []);

  const handleSelect = (e: any) => {
    const value = Number(e.target.value);
    setNurseId(value);
  };

  const handleAssign = async () => {
    if (!id || !nurseId) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await assignNurseToCampaign(Number(id), nurseId);
      setSuccess("Đã bổ nhiệm y tá!");
      // KHÔNG reset nurseId ở đây
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  if (!id) return (
    <Box p={3}>
      <Typography color="error">Thiếu mã chiến dịch!</Typography>
    </Box>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Bổ nhiệm y tá cho chiến dịch</Typography>
      <Select
        value={nurseId}
        onChange={handleSelect}
        sx={{ minWidth: 200 }}
        displayEmpty
        MenuProps={{ disablePortal: true }}
      >
        <MenuItem value={0} disabled>Chọn nhân viên...</MenuItem>
        {nurses.map(n => (
          <MenuItem value={n.nurseId} key={n.nurseId}>{n.name}</MenuItem>
        ))}
      </Select>
      <Button
        sx={{ ml: 2 }}
        variant="contained"
        onClick={handleAssign}
        disabled={loading || nurseId === 0}
      >
        Bổ nhiệm
      </Button>
      {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default AssignNurse;