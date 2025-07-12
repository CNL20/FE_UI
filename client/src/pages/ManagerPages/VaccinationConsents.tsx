import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getParentConsentForms } from "../../services/vaccinationService";
import { VaccinationConsent } from "../../types/vaccination";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const VaccinationConsents = () => {
  const { campaignId } = useParams();
  const [consents, setConsents] = useState<VaccinationConsent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allConsents = await getParentConsentForms();
      setConsents(allConsents.filter(c => c.campaignId === Number(campaignId)));
    };
    fetchData();
  }, [campaignId]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Danh sách phiếu xác nhận tiêm chủng</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Học sinh</TableCell>
            <TableCell>Lớp</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Ngày xác nhận</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consents.map((c) => (
            <TableRow key={c.consentId}>
              <TableCell>{c.student?.name}</TableCell>
              <TableCell>{c.class}</TableCell>
              <TableCell>
                {c.consentStatus == null
                  ? "Chưa phản hồi"
                  : c.consentStatus
                  ? "Đồng ý"
                  : "Không đồng ý"}
              </TableCell>
              <TableCell>
                {c.consentDate ? new Date(c.consentDate).toLocaleDateString() : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default VaccinationConsents;