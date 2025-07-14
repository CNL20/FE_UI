import React, { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

interface Campaign {
  id: number;
  name: string;
  startDate: string;           // Đổi tên trường này
  targetClass: string;
  status: string;
}

const NurseHealthCheckCampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const nurseId = localStorage.getItem("nurse_id");
    apiClient
      .get(`/health-check/nurse/campaigns?nurseId=${nurseId}`)
      .then((res: { data: Campaign[] }) => setCampaigns(res.data || []))
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { title: "Tên chiến dịch", dataIndex: "name", key: "name" },
    {
      title: "Ngày khám",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'), // Định dạng ngày
    },
    { title: "Lớp", dataIndex: "targetClass", key: "targetClass" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: Campaign) => (
        <Button onClick={() => navigate(`/nurse/health-check-campaigns/${record.id}`)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Chiến dịch khám sức khỏe được phân công</h2>
      <Spin spinning={loading}>
        <Table dataSource={campaigns.map((c) => ({ ...c, key: c.id }))} columns={columns} />
      </Spin>
    </div>
  );
};

export default NurseHealthCheckCampaignList;