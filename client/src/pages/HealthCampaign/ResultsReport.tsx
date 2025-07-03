import React, { useState, useEffect } from 'react';
import { ResultsReportProps, HealthCampaign, HealthCheckResult, CampaignStudent } from '../../types';
import apiClient from '../../services/apiClient';

const ResultsReport: React.FC<ResultsReportProps> = ({ campaignId, onLogout }) => {
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);
  const [results, setResults] = useState<HealthCheckResult[]>([]);
  const [students, setStudents] = useState<CampaignStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showStatsModal, setShowStatsModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [campaignId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      setLoading(true);
      const [campaignResponse, resultsResponse, studentsResponse] = await Promise.all([
        apiClient.get<HealthCampaign>(`/health-campaigns/${campaignId}`),
        apiClient.get<HealthCheckResult[]>(`/health-campaigns/${campaignId}/results`),
        apiClient.get<CampaignStudent[]>(`/health-campaigns/${campaignId}/students`)
      ]);

      setCampaign(campaignResponse.data);
      setResults(resultsResponse.data);
      setStudents(studentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotifications = async () => {
    setSending(true);
    try {
      // Gửi thông báo cho phụ huynh có con hoàn thành khám
      const completedStudents = students.filter(s => s.checkupStatus === 'completed');
      const response = await apiClient.post(`/health-campaigns/${campaignId}/send-results`, {
        studentIds: completedStudents.map(s => s.studentId)
      });

      if (response.status === 200) {
        alert('Đã gửi thông báo kết quả khám sức khỏe cho phụ huynh thành công!');
      }
    } catch (error) {
      console.error('Error sending notifications:', error);
      alert('Có lỗi xảy ra khi gửi thông báo. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  const handleSendIncompleteNotifications = async () => {
    setSending(true);
    try {
      // Gửi thông báo nhắc nhở cho phụ huynh có con chưa hoàn thành khám
      const incompleteStudents = students.filter(s => s.checkupStatus !== 'completed');
      const response = await apiClient.post(`/health-campaigns/${campaignId}/send-reminders`, {
        studentIds: incompleteStudents.map(s => s.studentId)
      });

      if (response.status === 200) {
        alert('Đã gửi thông báo nhắc nhở cho phụ huynh thành công!');
      }
    } catch (error) {
      console.error('Error sending reminders:', error);
      alert('Có lỗi xảy ra khi gửi thông báo nhắc nhở. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  const exportResults = async () => {
    try {
      const response = await apiClient.get(`/health-campaigns/${campaignId}/export`, {
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `health-check-results-${campaign?.title || 'campaign'}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting results:', error);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || student.checkupStatus === selectedStatus;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const stats = {
    total: students.length,
    completed: students.filter(s => s.checkupStatus === 'completed').length,
    inProgress: students.filter(s => s.checkupStatus === 'in-progress').length,
    pending: students.filter(s => s.checkupStatus === 'pending').length,
    present: students.filter(s => s.attendanceStatus === 'present').length,
    absent: students.filter(s => s.attendanceStatus === 'absent').length
  };

  const getBMIStats = () => {
    const bmiData = results.map(r => r.bmi).filter((bmi): bmi is number => bmi !== undefined);
    const underweight = bmiData.filter(bmi => bmi < 18.5).length;
    const normal = bmiData.filter(bmi => bmi >= 18.5 && bmi < 25).length;
    const overweight = bmiData.filter(bmi => bmi >= 25 && bmi < 30).length;
    const obese = bmiData.filter(bmi => bmi >= 30).length;

    return { underweight, normal, overweight, obese };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'in-progress': return 'Đang khám';
      case 'pending': return 'Chưa khám';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Báo Cáo Kết Quả Khám Sức Khỏe</h1>
              <p className="text-gray-600">{campaign?.title}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Quay Lại
              </button>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Tổng số</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Hoàn thành</div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Đang khám</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Chưa khám</div>
            <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Có mặt</div>
            <div className="text-2xl font-bold text-blue-600">{stats.present}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Vắng mặt</div>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hành Động</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSendNotifications}
              disabled={sending || stats.completed === 0}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? 'Đang gửi...' : `Gửi kết quả cho ${stats.completed} phụ huynh`}
            </button>
            
            <button
              onClick={handleSendIncompleteNotifications}
              disabled={sending || stats.pending + stats.inProgress === 0}
              className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? 'Đang gửi...' : `Nhắc nhở ${stats.pending + stats.inProgress} phụ huynh`}
            </button>

            <button
              onClick={exportResults}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Xuất báo cáo Excel
            </button>

            <button
              onClick={() => setShowStatsModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Xem thống kê chi tiết
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bộ Lọc</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tìm kiếm
              </label>
              <input
                type="text"
                placeholder="Tìm theo tên hoặc lớp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khối lớp
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                {campaign?.targetGrades?.map((grade: string) => (
                  <option key={grade} value={grade}>Lớp {grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái khám
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="completed">Hoàn thành</option>
                <option value="in-progress">Đang khám</option>
                <option value="pending">Chưa khám</option>
              </select>
            </div>

            <div className="flex items-end">
              <span className="text-sm text-gray-500">
                Hiển thị {filteredStudents.length} / {students.length} học sinh
              </span>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lớp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm danh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái khám
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kết quả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phụ huynh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const result = results.find(r => r.studentId === student.studentId);
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.student.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Lớp {student.student.grade}{student.student.class}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.attendanceStatus === 'present' ? 'bg-green-100 text-green-800' :
                        student.attendanceStatus === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.attendanceStatus === 'present' ? 'Có mặt' :
                         student.attendanceStatus === 'absent' ? 'Vắng mặt' : 'Chưa điểm danh'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.checkupStatus || 'pending')}`}>
                        {getStatusText(student.checkupStatus || 'pending')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result ? (
                        <div className="text-sm text-gray-900">
                          <div>BMI: {result.bmi}</div>
                          <div>Huyết áp: {result.bloodPressure.systolic}/{result.bloodPressure.diastolic}</div>
                          <div>Thị lực: {result.vision.leftEye}/{result.vision.rightEye}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Chưa có kết quả</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.student.parentName}</div>
                      <div className="text-sm text-gray-500">{student.student.parentPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {result ? (
                        <button
                          onClick={() => {/* View detailed result */}}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Xem chi tiết
                        </button>
                      ) : (
                        <span className="text-gray-400">Chưa có dữ liệu</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Statistics Modal */}
        {showStatsModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thống Kê Chi Tiết</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* BMI Statistics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Phân Bố BMI</h4>
                    <div className="space-y-2">
                      {(() => {
                        const bmiStats = getBMIStats();
                        return (
                          <>
                            <div className="flex justify-between">
                              <span>Thiếu cân (&lt;18.5)</span>
                              <span className="text-blue-600">{bmiStats.underweight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Bình thường (18.5-24.9)</span>
                              <span className="text-green-600">{bmiStats.normal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thừa cân (25-29.9)</span>
                              <span className="text-yellow-600">{bmiStats.overweight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Béo phì (≥30)</span>
                              <span className="text-red-600">{bmiStats.obese}</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Health Status */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Tình Trạng Sức Khỏe</h4>
                    <div className="space-y-2">
                      {(() => {
                        const healthStats = {
                          excellent: results.filter(r => r.generalHealth.status === 'excellent').length,
                          good: results.filter(r => r.generalHealth.status === 'good').length,
                          fair: results.filter(r => r.generalHealth.status === 'fair').length,
                          poor: results.filter(r => r.generalHealth.status === 'poor').length
                        };
                        return (
                          <>
                            <div className="flex justify-between">
                              <span>Xuất sắc</span>
                              <span className="text-green-600">{healthStats.excellent}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tốt</span>
                              <span className="text-blue-600">{healthStats.good}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Khá</span>
                              <span className="text-yellow-600">{healthStats.fair}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Kém</span>
                              <span className="text-red-600">{healthStats.poor}</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowStatsModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsReport;
