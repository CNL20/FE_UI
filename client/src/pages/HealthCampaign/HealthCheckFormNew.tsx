import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Stack,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Save,
  Visibility,
  Favorite,
  Height,
  MonitorWeight,
  Calculate,
  CheckCircle,
  Warning,
  Info,
  Assignment,
  School,
  Today,
  Phone,
  Email,
  MedicalServices,
  Analytics,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { HealthCheckResult, Student, HealthCampaign } from '../../types';

interface HealthCheckFormProps {
  onLogout: () => void;
}

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { campaignId, studentId } = useParams<{ campaignId: string; studentId: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [existingResult, setExistingResult] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bmi: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    leftEye: '',
    rightEye: '',
    dentalStatus: 'good' as 'good' | 'needs-attention' | 'treatment-required',
    dentalNotes: '',
    generalStatus: 'excellent' as 'excellent' | 'good' | 'fair' | 'poor',
    generalNotes: '',
    recommendations: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const commonRecommendations = [
    'Duy trì chế độ ăn uống cân bằng',
    'Tăng cường hoạt động thể chất',
    'Nghỉ ngơi đầy đủ 8 tiếng/ngày',
    'Khám mắt định kỳ',
    'Vệ sinh răng miệng đúng cách',
    'Kiểm tra sức khỏe định kỳ',
    'Hạn chế thức ăn nhanh',
    'Uống đủ nước mỗi ngày',
    'Bổ sung vitamin và khoáng chất'
  ];

  const steps = [
    {
      label: 'Thông tin cơ bản',
      description: 'Chiều cao, cân nặng, BMI',
    },
    {
      label: 'Sinh hiệu',
      description: 'Huyết áp, nhịp tim',
    },
    {
      label: 'Thị lực',
      description: 'Khám mắt',
    },
    {
      label: 'Khám răng miệng',
      description: 'Tình trạng răng miệng',
    },
    {
      label: 'Đánh giá tổng quan',
      description: 'Kết luận và khuyến nghị',
    },
  ];

  // Mock student data
  const mockStudent: Student = {
    id: studentId || '1',
    name: 'Nguyễn Văn An',
    fullName: 'Nguyễn Văn An',
    grade: 'Lớp 1',
    class: '1A',
    dateOfBirth: new Date('2017-03-15'),
    parentContact: '0912345001',
    parentName: 'Nguyễn Thị Lan',
  };

  useEffect(() => {
    fetchData();
  }, [campaignId, studentId]);

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInM = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      if (heightInM > 0 && weightInKg > 0) {
        const bmi = weightInKg / (heightInM * heightInM);
        setFormData(prev => ({ ...prev, bmi: bmi.toFixed(1) }));
      }
    }
  }, [formData.height, formData.weight]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStudent(mockStudent);
      
      // Check for existing results
      const existingData = localStorage.getItem(`health_check_${campaignId}_${studentId}`);
      if (existingData) {
        const result = JSON.parse(existingData);
        setExistingResult(result);
        setFormData({
          height: result.height?.toString() || '',
          weight: result.weight?.toString() || '',
          bmi: result.bmi?.toString() || '',
          systolicBP: result.bloodPressure?.systolic?.toString() || '',
          diastolicBP: result.bloodPressure?.diastolic?.toString() || '',
          heartRate: result.heartRate?.toString() || '',
          leftEye: result.vision?.leftEye || '',
          rightEye: result.vision?.rightEye || '',
          dentalStatus: result.dental?.status || 'good',
          dentalNotes: result.dental?.notes || '',
          generalStatus: result.generalHealth?.status || 'excellent',
          generalNotes: result.generalHealth?.notes || '',
          recommendations: result.recommendations || []
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecommendationToggle = (recommendation: string) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev.recommendations.includes(recommendation)
        ? prev.recommendations.filter(r => r !== recommendation)
        : [...prev.recommendations, recommendation]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 0: // Basic info
        if (!formData.height) newErrors.height = 'Chiều cao là bắt buộc';
        if (!formData.weight) newErrors.weight = 'Cân nặng là bắt buộc';
        break;
      case 1: // Vitals
        if (!formData.systolicBP) newErrors.systolicBP = 'Huyết áp tâm thu là bắt buộc';
        if (!formData.diastolicBP) newErrors.diastolicBP = 'Huyết áp tâm trương là bắt buộc';
        if (!formData.heartRate) newErrors.heartRate = 'Nhịp tim là bắt buộc';
        break;
      case 2: // Vision
        if (!formData.leftEye) newErrors.leftEye = 'Thị lực mắt trái là bắt buộc';
        if (!formData.rightEye) newErrors.rightEye = 'Thị lực mắt phải là bắt buộc';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      const result: HealthCheckResult = {
        id: `result_${Date.now()}`,
        campaignId: campaignId || '',
        studentId: studentId || '',
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi),
        bloodPressure: {
          systolic: parseInt(formData.systolicBP),
          diastolic: parseInt(formData.diastolicBP)
        },
        heartRate: parseInt(formData.heartRate),
        vision: {
          leftEye: formData.leftEye,
          rightEye: formData.rightEye
        },
        dental: {
          status: formData.dentalStatus,
          notes: formData.dentalNotes
        },
        generalHealth: {
          status: formData.generalStatus,
          notes: formData.generalNotes
        },
        recommendations: formData.recommendations,
        examiner: 'Bác sĩ khám',
        status: 'completed'
      };
      
      // Save to localStorage
      localStorage.setItem(`health_check_${campaignId}_${studentId}`, JSON.stringify(result));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowConfirmDialog(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Thiếu cân', color: 'warning' as const };
    if (bmi < 25) return { label: 'Bình thường', color: 'success' as const };
    if (bmi < 30) return { label: 'Thừa cân', color: 'warning' as const };
    return { label: 'Béo phì', color: 'error' as const };
  };

  if (loading) {
    return (
      <Box>
        <Navbar onLogout={onLogout} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar onLogout={onLogout} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
              <ArrowBack />
            </IconButton>
            <MedicalServices fontSize="large" />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Khám sức khỏe
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {student?.fullName}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {/* Student Info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: 'fit-content' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Thông tin học sinh
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 1, bgcolor: 'primary.main' }}>
                    <Person sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {student?.fullName}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School color="primary" />
                  <Typography variant="body2" color="text.secondary">Lớp:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {student?.grade} - {student?.class}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Today color="primary" />
                  <Typography variant="body2" color="text.secondary">Ngày sinh:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {student?.dateOfBirth.toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" />
                  <Typography variant="body2" color="text.secondary">Phụ huynh:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {student?.parentName}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone color="primary" />
                  <Typography variant="body2" color="text.secondary">Điện thoại:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {student?.parentContact}
                  </Typography>
                </Box>
                
                {existingResult && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Học sinh này đã được khám trước đó. Bạn đang cập nhật kết quả.
                  </Alert>
                )}
              </Stack>
            </Paper>
          </Grid>

          {/* Health Check Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment color="primary" />
                Phiếu khám sức khỏe
              </Typography>
              
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {step.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      {index === 0 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Chiều cao (cm)"
                              name="height"
                              type="number"
                              value={formData.height}
                              onChange={handleInputChange}
                              error={!!errors.height}
                              helperText={errors.height}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Height />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Cân nặng (kg)"
                              name="weight"
                              type="number"
                              value={formData.weight}
                              onChange={handleInputChange}
                              error={!!errors.weight}
                              helperText={errors.weight}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MonitorWeight />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          {formData.bmi && (
                            <Grid item xs={12}>
                              <Alert 
                                severity={getBMIStatus(parseFloat(formData.bmi)).color}
                                icon={<Calculate />}
                              >
                                <Typography variant="body2">
                                  <strong>BMI: {formData.bmi}</strong> - {getBMIStatus(parseFloat(formData.bmi)).label}
                                </Typography>
                              </Alert>
                            </Grid>
                          )}
                        </Grid>
                      )}

                      {index === 1 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Huyết áp tâm thu (mmHg)"
                              name="systolicBP"
                              type="number"
                              value={formData.systolicBP}
                              onChange={handleInputChange}
                              error={!!errors.systolicBP}
                              helperText={errors.systolicBP}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Favorite />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Huyết áp tâm trương (mmHg)"
                              name="diastolicBP"
                              type="number"
                              value={formData.diastolicBP}
                              onChange={handleInputChange}
                              error={!!errors.diastolicBP}
                              helperText={errors.diastolicBP}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Favorite />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Nhịp tim (lần/phút)"
                              name="heartRate"
                              type="number"
                              value={formData.heartRate}
                              onChange={handleInputChange}
                              error={!!errors.heartRate}
                              helperText={errors.heartRate}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Favorite />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}

                      {index === 2 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Thị lực mắt trái"
                              name="leftEye"
                              value={formData.leftEye}
                              onChange={handleInputChange}
                              error={!!errors.leftEye}
                              helperText={errors.leftEye}
                              placeholder="Ví dụ: 10/10"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Visibility />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Thị lực mắt phải"
                              name="rightEye"
                              value={formData.rightEye}
                              onChange={handleInputChange}
                              error={!!errors.rightEye}
                              helperText={errors.rightEye}
                              placeholder="Ví dụ: 10/10"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Visibility />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}

                      {index === 3 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel>Tình trạng răng miệng</InputLabel>
                              <Select
                                value={formData.dentalStatus}
                                label="Tình trạng răng miệng"
                                onChange={(e) => handleSelectChange('dentalStatus', e.target.value)}
                              >
                                <MenuItem value="good">Tốt</MenuItem>
                                <MenuItem value="needs-attention">Cần chú ý</MenuItem>
                                <MenuItem value="treatment-required">Cần điều trị</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Ghi chú răng miệng"
                              name="dentalNotes"
                              value={formData.dentalNotes}
                              onChange={handleInputChange}
                              multiline
                              rows={2}
                              placeholder="Ghi chú chi tiết..."
                            />
                          </Grid>
                        </Grid>
                      )}

                      {index === 4 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel>Tình trạng sức khỏe tổng quan</InputLabel>
                              <Select
                                value={formData.generalStatus}
                                label="Tình trạng sức khỏe tổng quan"
                                onChange={(e) => handleSelectChange('generalStatus', e.target.value)}
                              >
                                <MenuItem value="excellent">Xuất sắc</MenuItem>
                                <MenuItem value="good">Tốt</MenuItem>
                                <MenuItem value="fair">Khá</MenuItem>
                                <MenuItem value="poor">Kém</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Ghi chú tổng quan"
                              name="generalNotes"
                              value={formData.generalNotes}
                              onChange={handleInputChange}
                              multiline
                              rows={2}
                              placeholder="Ghi chú tổng quan..."
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                              Khuyến nghị:
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                              {commonRecommendations.map((rec) => (
                                <Chip
                                  key={rec}
                                  label={rec}
                                  onClick={() => handleRecommendationToggle(rec)}
                                  color={formData.recommendations.includes(rec) ? 'primary' : 'default'}
                                  variant={formData.recommendations.includes(rec) ? 'filled' : 'outlined'}
                                  clickable
                                />
                              ))}
                            </Stack>
                          </Grid>
                        </Grid>
                      )}

                      <Box sx={{ mb: 2, mt: 2 }}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Quay lại
                          </Button>
                          {activeStep === steps.length - 1 ? (
                            <Button
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={submitting}
                              startIcon={submitting ? <CircularProgress size={20} /> : <Save />}
                            >
                              {submitting ? 'Đang lưu...' : 'Hoàn thành khám'}
                            </Button>
                          ) : (
                            <Button variant="contained" onClick={handleNext}>
                              Tiếp theo
                            </Button>
                          )}
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
        </Grid>

        {/* Success Dialog */}
        <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CheckCircle color="success" fontSize="large" />
              <Typography variant="h6">Khám sức khỏe hoàn thành!</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Alert severity="success" sx={{ mb: 2 }}>
              Đã lưu kết quả khám sức khỏe cho học sinh <strong>{student?.fullName}</strong>
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Kết quả khám đã được lưu vào hệ thống. Bạn có thể tiếp tục khám cho học sinh khác hoặc xem báo cáo tổng hợp.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmDialog(false)}>Đóng</Button>
            <Button 
              variant="contained" 
              onClick={() => {
                setShowConfirmDialog(false);
                navigate(`/manager/health-campaigns/${campaignId}/attendance`);
              }}
            >
              Quay lại điểm danh
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default HealthCheckForm;
