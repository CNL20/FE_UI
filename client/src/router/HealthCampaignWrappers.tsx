import React from 'react';
import { useParams } from 'react-router-dom';
import StudentAssign from '../pages/HealthCampaign/StudentAssign';
import NurseAssign from '../pages/HealthCampaign/NurseAssign';
import Attendance from '../pages/HealthCampaign/Attendance';
import HealthCheckForm from '../pages/HealthCampaign/HealthCheckForm';
import ResultsReport from '../pages/HealthCampaign/ResultsReport';

// Wrapper components to extract params from URL
export const StudentAssignWrapper: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { campaignId } = useParams<{ campaignId: string }>();
  return <StudentAssign campaignId={campaignId || ''} onLogout={onLogout} />;
};

export const NurseAssignWrapper: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { campaignId } = useParams<{ campaignId: string }>();
  return <NurseAssign campaignId={campaignId || ''} onLogout={onLogout} />;
};

export const AttendanceWrapper: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { campaignId } = useParams<{ campaignId: string }>();
  return <Attendance campaignId={campaignId || ''} onLogout={onLogout} />;
};

export const HealthCheckFormWrapper: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { campaignId, studentId } = useParams<{ campaignId: string; studentId: string }>();
  return <HealthCheckForm campaignId={campaignId || ''} studentId={studentId || ''} onLogout={onLogout} />;
};

export const ResultsReportWrapper: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { campaignId } = useParams<{ campaignId: string }>();
  return <ResultsReport campaignId={campaignId || ''} onLogout={onLogout} />;
};
