import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import { ROUTES } from "../../constants";

/**
 * Lưu ý:
 * - Khi bấm "Xác nhận tiêm chủng", chỉ navigate đến dashboard/consent (KHÔNG vào thẳng phiếu với campaignId).
 * - Nếu sau này chọn campaign cụ thể, hãy điều hướng sang dashboard/consent/:campaignId nếu cần.
 */

const VaccinationEventDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  // Điều hướng đến trang xác nhận tiêm chủng (dashboard/consent)
  const handleNavigateToVaccinationConsent = () => {
    navigate("consent"); // relative path: /parent/vaccination-event-dashboard/consent
  };

  const handleNavigateToVaccinationSchedule = () => {
    navigate("schedule"); // relative path
  };
  const handleNavigateToVaccinationNews = () => {
    navigate("news"); // relative path
  };
  return (
    <>
      <Navbar
        onLogout={onLogout ?? (() => {})}
      />
      <Box sx={{ height: 68 }} />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(#b4d3db, #abdae2 70%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: { xs: 2, md: 8 },
        }}
      >
        <Box
          sx={{
            bgcolor: "#a9c8d6",
            borderRadius: 3,
            py: 4,
            px: 2,
            mb: 4,
            boxShadow: "0 6px 16px 0 #bee7f9",
            width: "100%",
            maxWidth: 1200,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#5b7c8b" }}>
            Sự kiện tiêm chủng
          </Typography>
          <Typography sx={{ color: "#5b7c8b", mt: 1, fontWeight: 500 }}>
            Chọn một trong các mục bên dưới để tiếp tục
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: 1200,
            width: "100%",
            mb: 4,
            px: { xs: 0, md: 2 },
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} md={4}>
            <Box
              onClick={handleNavigateToVaccinationConsent}
              sx={{
                bgcolor: "#2ecc71",
                borderRadius: 3,
                color: "#fff",
                minHeight: 120,
                p: 3,
                boxShadow: "0 2px 8px 0 #b5b6c5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
                textAlign: "center"
              }}
            >
              <VaccinesIcon sx={{ fontSize: 46, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Xác nhận tiêm chủng
              </Typography>
              <Typography>Xác nhận tiêm chủng vaccin cho học sinh.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={handleNavigateToVaccinationSchedule}
              sx={{
                bgcolor: "#3498db",
                borderRadius: 3,
                color: "#fff",
                minHeight: 120,
                p: 3,
                boxShadow: "0 2px 8px 0 #b5b6c5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
                textAlign: "center"
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 46, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Lịch Tiêm chủng
              </Typography>
              <Typography>Xem lịch tiêm chủng vaccin của học sinh.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={handleNavigateToVaccinationNews}
              sx={{
                bgcolor: "#9b59b6",
                borderRadius: 3,
                color: "#fff",
                minHeight: 120,
                p: 3,
                boxShadow: "0 2px 8px 0 #b5b6c5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
                textAlign: "center"
              }}
            >
              <InfoIcon sx={{ fontSize: 46, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Tin tức về vaccin
              </Typography>
              <Typography>Xem thông tin và lợi ích của các loại vaccin hiện có.</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            onClick={() => navigate(ROUTES.PARENT.DASHBOARD)}
            variant="contained"
            sx={{
              background: "#3498db",
              color: "#fff",
              fontWeight: 700,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontSize: 16,
              boxShadow: 2,
              "&:hover": { background: "#217dbb" }
            }}
          >
            Quay về
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default VaccinationEventDashboard;