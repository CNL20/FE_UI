import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  Search,
  Group,
  Assignment,
  NotificationImportant,
  School,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { StudentAssignProps, Student, HealthCampaign } from '../../types';

const StudentAssign: React.FC<StudentAssignProps> = ({ campaignId, onLogout }) => {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [assignedStudents, setAssignedStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  // Mock data for demo
  const mockCampaign: HealthCampaign = {
    id: campaignId,
    title: 'Chiến dịch khám sức khỏe định kỳ Q1/2024',
    description: 'Chương trình khám sức khỏe định kỳ cho học sinh các khối lớp từ 1-12',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-25'),
    location: 'Phòng y tế trường',
    targetGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
    status: 'planned',
    totalStudents: 150,
    completedCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      fullName: 'Nguyễn Văn An',
      grade: 'Lớp 1',
      class: '1A',
      dateOfBirth: new Date('2017-05-15'),
      parentContact: '0987654321',
      parentName: 'Nguyễn Thị Bình',
      parentPhone: '0987654321',
    },
    {
      id: '2',
      name: 'Trần Thị Bảo',
      fullName: 'Trần Thị Bảo',
      grade: 'Lớp 1',
      class: '1B',
      dateOfBirth: new Date('2017-08-20'),
      parentContact: '0976543210',
      parentName: 'Trần Văn Cường',
      parentPhone: '0976543210',
    },
    {
      id: '3',
      name: 'Lê Minh Cường',
      fullName: 'Lê Minh Cường',
      grade: 'Lớp 2',
      class: '2A',
      dateOfBirth: new Date('2016-03-10'),
      parentContact: '0965432109',
      parentName: 'Lê Thị Dung',
      parentPhone: '0965432109',
    },
    {
      id: '4',
      name: 'Phạm Thị Diệu',
      fullName: 'Phạm Thị Diệu',
      grade: 'Lớp 2',
      class: '2B',
      dateOfBirth: new Date('2016-11-25'),
      parentContact: '0954321098',
      parentName: 'Phạm Văn Em',
      parentPhone: '0954321098',
    },
    {
      id: '5',
      name: 'Hoàng Văn Giang',
      fullName: 'Hoàng Văn Giang',
      grade: 'Lớp 3',
      class: '3A',
      dateOfBirth: new Date('2015-07-12'),
      parentContact: '0943210987',
      parentName: 'Hoàng Thị Hạnh',
      parentPhone: '0943210987',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCampaign(mockCampaign);
        
        // Filter students based on campaign target grades
        const eligibleStudents = mockStudents.filter(student => 
          mockCampaign.targetGrades?.includes(student.grade)
        );
        setAvailableStudents(eligibleStudents);
        setAssignedStudents([]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [campaignId]);

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    const filteredStudents = getFilteredStudents();
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const handleAssignStudents = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const studentsToAssign = availableStudents.filter(student => 
        selectedStudents.includes(student.id)
      );
      
      setAssignedStudents(prev => [...prev, ...studentsToAssign]);
      setAvailableStudents(prev => prev.filter(student => 
        !selectedStudents.includes(student.id)
      ));
      setSelectedStudents([]);
      
      alert(`Đã phân công ${studentsToAssign.length} học sinh thành công!`);
    } catch (error) {
      console.error('Error assigning students:', error);
      alert('Có lỗi xảy ra khi phân công học sinh');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    try {
      const studentToRemove = assignedStudents.find(student => student.id === studentId);
      if (studentToRemove) {
        setAssignedStudents(prev => prev.filter(student => student.id !== studentId));
        setAvailableStudents(prev => [...prev, studentToRemove]);
        alert('Đã hủy phân công học sinh!');
      }
    } catch (error) {
      console.error('Error removing student:', error);
      alert('Có lỗi xảy ra khi hủy phân công');
    }
  };

  const handleSendNotifications = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(`Đã gửi thông báo đến ${assignedStudents.length} phụ huynh!`);
    } catch (error) {
      console.error('Error sending notifications:', error);
      alert('Có lỗi xảy ra khi gửi thông báo');
    }
  };

  const getFilteredStudents = () => {
    return availableStudents.filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.class.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = gradeFilter === '' || student.grade === gradeFilter;
      return matchesSearch && matchesGrade;
    });
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onLogout={onLogout} />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CircularProgress size={48} />
        </Box>
      </Box>
    );
  }

  const filteredStudents = getFilteredStudents();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar onLogout={onLogout} />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/manager/health-campaigns/${campaignId}`)}
              variant="outlined"
            >
              Quay lại
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Phân công học sinh
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {campaign?.title}
              </Typography>
            </Box>
          </Box>
          
          {/* Campaign info */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Thời gian
                </Typography>
                <Typography variant="body2">
                  {campaign?.startDate.toLocaleDateString('vi-VN')} - {campaign?.endDate.toLocaleDateString('vi-VN')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Địa điểm
                </Typography>
                <Typography variant="body2">
                  {campaign?.location}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Khối lớp tham gia
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  {campaign?.targetGrades?.map((grade) => (
                    <Chip key={grade} label={grade} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Available Students */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <School color="primary" />
                Danh sách học sinh khả dụng ({filteredStudents.length})
              </Typography>
              
              {/* Search and Filter */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  placeholder="Tìm kiếm học sinh, lớp..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flexGrow: 1 }}
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Khối lớp</InputLabel>
                  <Select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    label="Khối lớp"
                  >
                    <MenuItem value="">Tất cả</MenuItem>
                    {campaign?.targetGrades?.map((grade) => (
                      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Selection Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleSelectAllStudents}
                  disabled={filteredStudents.length === 0}
                >
                  {selectedStudents.length === filteredStudents.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Đã chọn: {selectedStudents.length} học sinh
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="contained"
                  onClick={handleAssignStudents}
                  disabled={selectedStudents.length === 0}
                  startIcon={<Assignment />}
                >
                  Phân công ({selectedStudents.length})
                </Button>
              </Box>

              {/* Students Table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                          indeterminate={selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length}
                          onChange={handleSelectAllStudents}
                        />
                      </TableCell>
                      <TableCell>Họ và tên</TableCell>
                      <TableCell>Lớp</TableCell>
                      <TableCell>Khối</TableCell>
                      <TableCell>Phụ huynh</TableCell>
                      <TableCell>Liên hệ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person fontSize="small" color="action" />
                            {student.fullName}
                          </Box>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <Chip label={student.grade} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>{student.parentName}</TableCell>
                        <TableCell>{student.parentPhone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {filteredStudents.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  {searchTerm || gradeFilter 
                    ? 'Không tìm thấy học sinh phù hợp với điều kiện tìm kiếm.'
                    : 'Tất cả học sinh đã được phân công hoặc không có học sinh khả dụng.'
                  }
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Assigned Students */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Group color="primary" />
                    Đã phân công ({assignedStudents.length})
                  </Typography>
                  
                  {assignedStudents.length > 0 ? (
                    <>
                      <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 2 }}>
                        {assignedStudents.map((student) => (
                          <Box
                            key={student.id}
                            sx={{
                              p: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              mb: 1,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle2">
                                {student.fullName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {student.class} - {student.grade}
                              </Typography>
                            </Box>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleRemoveStudent(student.id)}
                            >
                              Hủy
                            </Button>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSendNotifications}
                        startIcon={<NotificationImportant />}
                        color="success"
                      >
                        Gửi thông báo
                      </Button>
                    </>
                  ) : (
                    <Alert severity="info">
                      Chưa có học sinh nào được phân công.
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 Thống kê
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Tổng học sinh khả dụng:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {availableStudents.length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Đã phân công:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {assignedStudents.length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Còn lại:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="warning.main">
                        {availableStudents.length}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentAssign;
