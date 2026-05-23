import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

interface BackBtnProps {
  label?: string;
  to?: string;
  onClick?: () => void;
}

export default function BackBtn({ label = "Back", to, onClick }: BackBtnProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="text"
      onClick={handleClick}
      startIcon={<ArrowBackIosNewRoundedIcon />}
      sx={{
        color: "text.secondary",
        fontWeight: 500,
        fontSize: "0.875rem",
        textTransform: "none",
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          color: "primary.main",
          backgroundColor: "action.hover",
        },
      }}
    >
      {label}
    </Button>
  );
}
