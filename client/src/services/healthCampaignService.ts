// Health Campaign Service for Parent Pages
import { HealthCampaign } from '../types';

export const healthCampaignService = {
  // Get all available campaigns for parents
  getAvailableCampaigns: (): HealthCampaign[] => {
    try {
      const campaigns: HealthCampaign[] = [];
      
      // Get campaigns from localStorage (created by managers)
      const keys = Object.keys(localStorage);
      const campaignKeys = keys.filter(key => key.startsWith('campaign_'));
      
      campaignKeys.forEach(key => {
        const campaignData = localStorage.getItem(key);
        if (campaignData) {
          try {
            const data = JSON.parse(campaignData);
            const campaignId = key.replace('campaign_', '');
            
            const campaign: HealthCampaign = {
              id: campaignId,
              title: data.title || 'Chiến dịch khám sức khỏe',
              description: data.description || 'Mô tả chiến dịch',
              startDate: new Date(data.startDate),
              endDate: new Date(data.endDate),
              location: data.location || 'Phòng y tế trường',
              targetGrades: data.targetGrades || [],
              status: 'planned',
              totalStudents: 150,
              completedCount: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            campaigns.push(campaign);
          } catch (e) {
            console.error('Error parsing campaign data:', e);
          }
        }
      });

      // Add some default campaigns for demo
      if (campaigns.length === 0) {
        campaigns.push(
          {
            id: 'default_1',
            title: 'Khám sức khỏe định kỳ học kỳ I năm học 2024-2025',
            description: 'Chương trình khám sức khỏe tổng quát cho tất cả học sinh từ lớp 1 đến lớp 12, bao gồm đo chiều cao, cân nặng, kiểm tra thị lực, răng miệng.',
            startDate: new Date('2024-09-01'),
            endDate: new Date('2024-09-15'),
            location: 'Phòng y tế trường - Tầng 1 Khu A',
            targetGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
            status: 'active',
            totalStudents: 250,
            completedCount: 180,
            createdAt: new Date('2024-08-15'),
            updatedAt: new Date('2024-09-01'),
          },
          {
            id: 'default_2',
            title: 'Khám sức khỏe chuyên sâu cho học sinh THPT',
            description: 'Khám sức khỏe chuyên sâu dành cho học sinh lớp 10, 11, 12 chuẩn bị thi đại học, bao gồm kiểm tra tim mạch, huyết áp, và tư vấn sức khỏe.',
            startDate: new Date('2024-10-01'),
            endDate: new Date('2024-10-10'),
            location: 'Phòng y tế trường - Tầng 2 Khu B',
            targetGrades: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
            status: 'planned',
            totalStudents: 150,
            completedCount: 0,
            createdAt: new Date('2024-09-15'),
            updatedAt: new Date('2024-09-15'),
          }
        );
      }

      return campaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error getting campaigns:', error);
      return [];
    }
  },

  // Get campaign by ID
  getCampaignById: (id: string): HealthCampaign | null => {
    const campaigns = healthCampaignService.getAvailableCampaigns();
    return campaigns.find(campaign => campaign.id === id) || null;
  },

  // Register for a campaign
  registerForCampaign: (campaignId: string, studentInfo: any): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        try {
          const registrations = JSON.parse(localStorage.getItem('campaign_registrations') || '[]');
          const newRegistration = {
            id: Date.now().toString(),
            campaignId,
            studentInfo,
            registeredAt: new Date().toISOString(),
            status: 'registered'
          };
          registrations.push(newRegistration);
          localStorage.setItem('campaign_registrations', JSON.stringify(registrations));
          resolve(true);
        } catch (error) {
          console.error('Error registering for campaign:', error);
          resolve(false);
        }
      }, 1000);
    });
  },

  // Get registrations for a specific student
  getStudentRegistrations: (studentId?: string): any[] => {
    try {
      const registrations = JSON.parse(localStorage.getItem('campaign_registrations') || '[]');
      if (studentId) {
        return registrations.filter((reg: any) => reg.studentInfo.studentId === studentId);
      }
      return registrations;
    } catch (error) {
      console.error('Error getting registrations:', error);
      return [];
    }
  }
};
