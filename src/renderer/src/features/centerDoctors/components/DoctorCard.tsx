import {
  Card,
  CardContent,
  CardActions,
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  Chip,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DoctorType } from "src/shared/types/common";

interface DoctorCardProps {
  doctor: DoctorType;
  onBookAppointment?: () => void;
  hasAppointment?: boolean;
}

function DoctorCard({
  doctor,
  onBookAppointment,
  hasAppointment = false,
}: DoctorCardProps) {
  const specialityLabel = doctor.speciality?.label || doctor.fellowship?.label;
  const proficiencyAreas = doctor.proficiency_area || [];
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",

        background: `linear-gradient(
                   135deg,
                   ${alpha(theme.palette.primary.main, 0.14)},
                   ${alpha(theme.palette.secondary.main, 0.08)}
                 )`,

        backdropFilter: "blur(22px)",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Profile Picture and Basic Info */}
          <Grid item xs={12} sm="auto">
            <Avatar
              src={doctor.profile_picture || ""}
              alt={doctor.full_name}
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                cursor: "pointer",
              }}
            />
          </Grid>

          <Grid item xs={12} sm="auto" sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
              دکتر {doctor.full_name}
            </Typography>
            {specialityLabel && (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {specialityLabel}
              </Typography>
            )}

            {/* Rating */}
            {doctor.is_recommended && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <StarIcon sx={{ color: "#FFC107", fontSize: "1.25rem" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  توصیه شده
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Proficiency Areas */}
        {proficiencyAreas.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <MedicalServicesIcon
                  sx={{ color: "#2196F3", fontSize: "1.125rem" }}
                />
                <Typography variant="caption" color="textSecondary">
                  حوزه های تخصص
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {/* {proficiencyAreas?.map((area, index) => (
                  <Chip
                    key={index}
                    label={area}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: "#2196F3", color: "#2196F3" }}
                  />
                ))} */}
              </Box>
            </Box>
          </>
        )}

        {/* Proficiency */}
        {doctor.proficiency?.label && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocalHospitalIcon
              sx={{ color: "#FFC107", fontSize: "1.125rem" }}
            />
            <Typography variant="caption" color="textSecondary">
              فوق تخصص: {doctor.proficiency.label}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Next Appointment */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <AccessTimeIcon sx={{ color: "#2196F3", fontSize: "1.125rem" }} />
          <Typography variant="caption" color="textSecondary">
            اولین نوبت خالی پزشک:
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#1976D2", fontWeight: "500" }}
          >
            {hasAppointment ? "موجود است" : "موجود نیست"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "flex-end",
          pt: 2,
          borderTop: "0.4px solid #adadad",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          color="warning"
          sx={{ borderRadius: 1 }}
        >
          مشاهده پروفایل
        </Button>
        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={onBookAppointment}
          disabled={!hasAppointment}
          sx={{ borderRadius: 1 }}
        >
          {hasAppointment ? "نوبت بگیرید" : "بدون نوبت"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default DoctorCard;
