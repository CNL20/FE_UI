import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Campaign,
  School,
  Schedule,
  Description,
  NotificationImportant,
  HealthAndSafety,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CampaignCreateProps } from '../../types';

const CampaignCreate: React.FC<CampaignCreateProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '08:00',
    endTime: '17:00',
    location: '',
    targetGrades: [] as string[],
    requirements: '',
    healthCheckItems: [] as string[],
    contactPerson: '',
    contactPhone: '',
    preparationInstructions: '',
    notifyParents: true,
    urgentNotification: false,
    notificationMessage: '',
    reminderDays: '3',
    estimatedDuration: '30',
    maxStudentsPerDay: '50',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const gradeOptions = [
    'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5',
    'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9',
    'Lớp 10', 'Lớp 11', 'Lớp 12'
  ];

  const healthCheckOptions = [
    'Đo chiều cao, cân nặng',
    'Khám mắt, đo thị lực',
    'Khám răng miệng',
    'Đo huyết áp',
    'Khám tim mạch',
    'Khám phổi',
    'Khám tai mũi họng',
    'Xét nghiệm máu cơ bản',
    'Xét nghiệm nước tiểu',
    'Khám tổng quát',
    'Tư vấn dinh dưỡng',
    'Tư vấn sức khỏe tâm thần'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors['title'] = 'Vui lòng nhập tên chiến dịch';
    }
    if (!formData.description.trim()) {
      newErrors['description'] = 'Vui lòng nhập mô tả chiến dịch';
    }
    if (!formData.startDate) {
      newErrors['startDate'] = 'Vui lòng chọn ngày bắt đầu';
    }
    if (!formData.endDate) {
      newErrors['endDate'] = 'Vui lòng chọn ngày kết thúc';
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors['endDate'] = 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    if (!formData.location.trim()) {
      newErrors['location'] = 'Vui lòng nhập địa điểm tổ chức';
    }
    if (formData.targetGrades.length === 0) {
      newErrors['targetGrades'] = 'Vui lòng chọn ít nhất một khối lớp';
    }
    if (!formData.contactPerson.trim()) {
      newErrors['contactPerson'] = 'Vui lòng nhập người liên hệ';
    }
    if (!formData.contactPhone.trim()) {
      newErrors['contactPhone'] = 'Vui lòng nhập số điện thoại liên hệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleGradeToggle = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      targetGrades: prev.targetGrades.includes(grade)
        ? prev.targetGrades.filter(g => g !== grade)
        : [...prev.targetGrades, grade],
    }));
  };

  const handleHealthCheckToggle = (item: string) => {
    setFormData(prev => ({
      ...prev,
      healthCheckItems: prev.healthCheckItems.includes(item)
        ? prev.healthCheckItems.filter(i => i !== item)
        : [...prev.healthCheckItems, item],
    }));
  };

  const generateNotificationMessage = () => {
    return `Kính gửi quý phụ huynh,

Trường thông báo về chiến dịch "${formData.title}" sẽ được tổ chức từ ${formData.startDate ? new Date(formData.startDate).toLocaleDateString('vi-VN') : '[Ngày bắt đầu]'} đến ${formData.endDate ? new Date(formData.endDate).toLocaleDateString('vi-VN') : '[Ngày kết thúc]'}.

📍 Địa điểm: ${formData.location || '[Địa điểm]'}
🕐 Thời gian: ${formData.startTime} - ${formData.endTime}
👥 Khối lớp: ${formData.targetGrades.join(', ')}

${formData.preparationInstructions ? `📋 Hướng dẫn chuẩn bị: ${formData.preparationInstructions}` : ''}

${formData.requirements ? `⚠️ Yêu cầu đặc biệt: ${formData.requirements}` : ''}

${formData.contactPerson ? `📞 Liên hệ: ${formData.contactPerson} - ${formData.contactPhone}` : ''}

Trân trọng,
Ban quản lý trường`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const campaignData = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        targetGrades: formData.targetGrades,
        requirements: formData.requirements,
        healthCheckItems: formData.healthCheckItems,
        estimatedDuration: parseInt(formData.estimatedDuration),
        maxStudentsPerDay: parseInt(formData.maxStudentsPerDay),
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        status: 'planned',
        createdAt: new Date().toISOString(),
      };

      console.log('Creating campaign:', campaignData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (formData.notifyParents) {
        const notificationData = {
          message: formData.notificationMessage || generateNotificationMessage(),
          urgent: formData.urgentNotification,
          reminderDays: parseInt(formData.reminderDays),
          targetGrades: formData.targetGrades,
        };
        
        console.log('Sending notifications to parents:', notificationData);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/manager/health-campaigns');
      }, 3000);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo chiến dịch. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar {...(onLogout ? { onLogout } : {})} />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3
        }}>
          <Card sx={{ p: 4, textAlign: 'center', maxWidth: 500 }}>
            <Campaign sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="success.main">
              Tạo chiến dịch thành công!
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              "{formData.title}"
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Chiến dịch khám sức khỏe đã được tạo thành công.
              {formData.notifyParents && " Thông báo đã được gửi đến phụ huynh."}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Đang chuyển hướng về danh sách chiến dịch...
            </Typography>
            <Box sx={{ mt: 2 }}>
              <CircularProgress size={20} />
            </Box>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar {...(onLogout ? { onLogout } : {})} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/manager/health-campaigns')}
              variant="outlined"
            >
              Quay lại
            </Button>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', flexGrow: 1 }}>
              Tạo chiến dịch khám sức khỏe
            </Typography>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Thông tin cơ bản */}
              <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Description color="primary" />
                  Thông tin cơ bản
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên chiến dịch"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      error={!!errors['title']}
                      helperText={errors['title']}
                      placeholder="VD: Khám sức khỏe định kỳ học kỳ I năm học 2024-2025"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mô tả chiến dịch"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      error={!!errors['description']}
                      helperText={errors['description']}
                      placeholder="Mô tả chi tiết về mục đích, nội dung khám sức khỏe..."
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Thời gian và địa điểm */}
              <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule color="primary" />
                  Thời gian và địa điểm
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Ngày bắt đầu"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      error={!!errors['startDate']}
                      helperText={errors['startDate']}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Ngày kết thúc"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      error={!!errors['endDate']}
                      helperText={errors['endDate']}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Giờ bắt đầu"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Giờ kết thúc"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Địa điểm tổ chức"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      error={!!errors['location']}
                      helperText={errors['location']}
                      placeholder="VD: Phòng y tế trường, Tầng 1 - Khu A"
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Đối tượng và nội dung */}
              <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School color="primary" />
                  Đối tượng và nội dung khám
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Khối lớp tham gia *
                    </Typography>
                    {errors['targetGrades'] && (
                      <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                        {errors['targetGrades']}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {gradeOptions.map((grade) => (
                        <Chip
                          key={grade}
                          label={grade}
                          onClick={() => handleGradeToggle(grade)}
                          color={formData.targetGrades.includes(grade) ? 'primary' : 'default'}
                          variant={formData.targetGrades.includes(grade) ? 'filled' : 'outlined'}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HealthAndSafety />
                      Nội dung khám sức khỏe
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {healthCheckOptions.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          onClick={() => handleHealthCheckToggle(item)}
                          color={formData.healthCheckItems.includes(item) ? 'secondary' : 'default'}
                          variant={formData.healthCheckItems.includes(item) ? 'filled' : 'outlined'}
                          size="small"
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Thời gian khám/học sinh (phút)"
                      type="number"
                      value={formData.estimatedDuration}
                      onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                      inputProps={{ min: 15, max: 120 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số học sinh tối đa/ngày"
                      type="number"
                      value={formData.maxStudentsPerDay}
                      onChange={(e) => handleInputChange('maxStudentsPerDay', e.target.value)}
                      inputProps={{ min: 10, max: 200 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Yêu cầu đặc biệt"
                      multiline
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      placeholder="VD: Nhịn ăn 8 tiếng trước khám, mang theo sổ tiêm chủng, mặc đồng phục..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Hướng dẫn chuẩn bị cho phụ huynh"
                      multiline
                      rows={3}
                      value={formData.preparationInstructions}
                      onChange={(e) => handleInputChange('preparationInstructions', e.target.value)}
                      placeholder="VD: Nhịn ăn 8 tiếng trước xét nghiệm, mang theo sổ tiêm chủng, giấy tờ tùy thân..."
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Thông tin liên hệ */}
              <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" />
                  Thông tin liên hệ
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Người liên hệ"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      error={!!errors['contactPerson']}
                      helperText={errors['contactPerson']}
                      placeholder="VD: Cô Nguyễn Thị A"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      error={!!errors['contactPhone']}
                      helperText={errors['contactPhone']}
                      placeholder="VD: 0123456789"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Cài đặt thông báo */}
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationImportant color="primary" />
                  Cài đặt thông báo
                </Typography>
                
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.notifyParents}
                        onChange={(e) => handleInputChange('notifyParents', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Gửi thông báo cho phụ huynh"
                  />
                  
                  {formData.notifyParents && (
                    <>
                      <TextField
                        fullWidth
                        label="Nội dung thông báo tùy chỉnh"
                        multiline
                        rows={6}
                        value={formData.notificationMessage}
                        onChange={(e) => handleInputChange('notificationMessage', e.target.value)}
                        placeholder="Để trống để sử dụng thông báo mặc định..."
                        helperText="Nội dung thông báo sẽ được tự động tạo nếu để trống"
                      />
                      
                      <TextField
                        fullWidth
                        label="Gửi nhắc nhở trước (ngày)"
                        type="number"
                        value={formData.reminderDays}
                        onChange={(e) => handleInputChange('reminderDays', e.target.value)}
                        inputProps={{ min: 1, max: 14 }}
                        helperText="Số ngày trước khi gửi thông báo nhắc nhở"
                      />
                      
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.urgentNotification}
                            onChange={(e) => handleInputChange('urgentNotification', e.target.checked)}
                            color="warning"
                          />
                        }
                        label="Thông báo khẩn cấp"
                      />
                      
                      <Alert severity="info" sx={{ mt: 2 }}>
                        Thông báo sẽ được gửi qua SMS và email đến tất cả phụ huynh.
                        {formData.urgentNotification && " Thông báo khẩn cấp sẽ được ưu tiên gửi ngay."}
                      </Alert>
                    </>
                  )}
                </Stack>
              </Paper>

              {/* Xem trước thông báo */}
              {formData.notifyParents && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Xem trước thông báo
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, maxHeight: 300, overflow: 'auto' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line', fontSize: '0.875rem' }}>
                      {formData.notificationMessage || generateNotificationMessage()}
                    </Typography>
                  </Box>
                </Paper>
              )}

              {/* Tóm tắt */}
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Tóm tắt chiến dịch
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Tên chiến dịch
                    </Typography>
                    <Typography variant="body1">
                      {formData.title || 'Chưa nhập'}
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Thời gian
                    </Typography>
                    <Typography variant="body1">
                      {formData.startDate && formData.endDate 
                        ? `${new Date(formData.startDate).toLocaleDateString('vi-VN')} - ${new Date(formData.endDate).toLocaleDateString('vi-VN')}`
                        : 'Chưa chọn'
                      }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formData.startTime} - {formData.endTime}
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Địa điểm
                    </Typography>
                    <Typography variant="body1">
                      {formData.location || 'Chưa nhập'}
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Khối lớp ({formData.targetGrades.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {formData.targetGrades.length > 0 ? (
                        formData.targetGrades.map((grade) => (
                          <Chip key={grade} label={grade} size="small" color="primary" />
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Chưa chọn khối lớp
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Nội dung khám ({formData.healthCheckItems.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {formData.healthCheckItems.length > 0 ? (
                        formData.healthCheckItems.slice(0, 3).map((item) => (
                          <Chip key={item} label={item} size="small" color="secondary" />
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Chưa chọn nội dung khám
                        </Typography>
                      )}
                      {formData.healthCheckItems.length > 3 && (
                        <Typography variant="body2" color="textSecondary">
                          +{formData.healthCheckItems.length - 3} mục khác
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Paper elevation={2} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => navigate('/manager/health-campaigns')}
              disabled={loading}
            >
              Hủy bỏ
            </Button>
            
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              sx={{ minWidth: 200 }}
            >
              {loading ? 'Đang tạo chiến dịch...' : 'Tạo chiến dịch'}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CampaignCreate;
