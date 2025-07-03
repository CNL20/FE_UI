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
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Campaign,
  School,
  Description,
  NotificationImportant,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CampaignCreateProps } from '../../types';

const CreateHealthCampaign: React.FC<CampaignCreateProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    targetGrades: [] as string[],
    notifyParents: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const gradeOptions = [
    'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5',
    'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9',
    'Lớp 10', 'Lớp 11', 'Lớp 12'
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
    if (!formData.location.trim()) {
      newErrors['location'] = 'Vui lòng nhập địa điểm tổ chức';
    }
    if (formData.targetGrades.length === 0) {
      newErrors['targetGrades'] = 'Vui lòng chọn ít nhất một khối lớp';
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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const campaignData = {
        ...formData,
        status: 'planned',
        createdAt: new Date().toISOString(),
      };

      console.log('Creating campaign:', campaignData);
      
      // Simulate API call to create campaign
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real application, you would get the campaign ID from the API response
      const createdCampaignId = 'campaign_' + Date.now(); // Mock campaign ID

      // Save campaign data to localStorage for parent pages to access
      // In real app, this would be saved to backend and parents would fetch via API
      const campaignDataForStorage = {
        id: createdCampaignId,
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        targetGrades: formData.targetGrades,
        status: 'planned',
        createdAt: new Date().toISOString(),
        notifyParents: formData.notifyParents
      };
      
      localStorage.setItem(`campaign_${createdCampaignId}`, JSON.stringify(campaignDataForStorage));

      if (formData.notifyParents) {
        console.log('Sending notifications to parents...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setSuccess(true);
      
      // Redirect to campaign detail page instead of campaign list
      setTimeout(() => {
        navigate(`/manager/health-campaigns/${createdCampaignId}`);
      }, 2000);
      
    } catch (err) {
      console.error('Error creating campaign:', err);
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
              <br />
              Đang chuyển hướng đến trang chi tiết chiến dịch...
            </Typography>
            <CircularProgress size={20} />
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Description color="primary" />
                Thông tin chiến dịch
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

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School />
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
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationImportant color="primary" />
                  Cài đặt thông báo
                </Typography>
                
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
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Thông báo sẽ được gửi qua SMS và email đến tất cả phụ huynh của các khối lớp đã chọn.
                  </Alert>
                )}
              </Paper>

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
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Địa điểm
                    </Typography>
                    <Typography variant="body1">
                      {formData.location || 'Chưa nhập'}
                    </Typography>
                  </Box>
                  
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
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

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

export default CreateHealthCampaign;
