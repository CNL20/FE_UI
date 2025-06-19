import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

interface Student {
  id: number;
  name: string;
}

interface HealthRecord {
  studentId: number;
  allergies: string;
  chronicDiseases: string;
  immunizations: string;
}

const NurseDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [record, setRecord] = useState<HealthRecord | null>(null);

  useEffect(() => {
    axios.get("http://localhost:5227/api/nurse/students")
      .then(res => setStudents(res.data))
      .catch(() => setStudents([]));
  }, []);

  const selectStudent = (id: number) => {
    setSelectedId(id);
    axios.get(`http://localhost:5227/api/nurse/students/${id}/health`)
      .then(res => setRecord(res.data))
      .catch(() => setRecord(null));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar setIsAuthenticated={() => {}} setUserRole={() => {}} />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="background.default" p={2}>
        <Card sx={{ maxWidth: 800, width: "100%" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>Bảng điều khiển Y tá</Typography>
            <Box display="flex" gap={4}>
              <Box flex={1}>
                <Typography variant="h6">Danh sách học sinh</Typography>
                <List>
                  {students.map(s => (
                    <ListItem button key={s.id} selected={selectedId === s.id} onClick={() => selectStudent(s.id)}>
                      <ListItemText primary={s.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box flex={2}>
                <Typography variant="h6">Hồ sơ sức khỏe</Typography>
                {record ? (
                  <>
                    <Typography>Allergies: {record.allergies}</Typography>
                    <Typography>Chronic Diseases: {record.chronicDiseases}</Typography>
                    <Typography>Immunizations: {record.immunizations}</Typography>
                  </>
                ) : (
                  <Typography>Chọn học sinh để xem hồ sơ sức khỏe.</Typography>
                )}
              </Box>
            </Box>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLogout}>Đăng xuất</Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default NurseDashboard;
