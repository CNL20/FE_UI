import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { assignNurseToCampaign } from "../../services/vaccinationService";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";

interface Nurse {
  nurseId: number;
  name: string;
}

// Bạn có thể fetch danh sách y tá từ API thay vì mock cứng
const mockNurses: Nurse[] = [
  { nurseId: 1, name: "Nguyễn Thị A" },
  { nurseId: 2, name: "Trần Văn B" }
];

const AssignNurse: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [nurseId, setNurseId] = useState<number>(mockNurses[0]?.nurseId ?? 0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAssign = async () => {
    if (!id || !nurseId) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await assignNurseToCampaign(Number(id), nurseId);
      setSuccess("Đã bổ nhiệm y tá!");
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  if (!id) return <Box p={3}><Typography color="error">Thiếu mã chiến dịch!</Typography></Box>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Bổ nhiệm y tá cho chiến dịch</Typography>
      <Select value={nurseId} onChange={e => setNurseId(Number(e.target.value))} sx={{ minWidth: 200 }}>
        {mockNurses.map(n => (
          <MenuItem value={n.nurseId} key={n.nurseId}>{n.name}</MenuItem>
        ))}
      </Select>
      <Button sx={{ ml: 2 }} variant="contained" onClick={handleAssign} disabled={loading}>
        Bổ nhiệm
      </Button>
      {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};
export default AssignNurse;