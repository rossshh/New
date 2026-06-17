import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface LogoProps {
  light?: boolean;
}

export default function Logo({ light }: LogoProps) {
  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #16C5A8 0%, #0E6E7C 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FFFFFF",
          }}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
          fontSize: "1.25rem",
          color: light ? "#FFFFFF" : "#11262A",
        }}
      >
        doxy<Box component="span" sx={{ color: "#16C5A8" }}>.me</Box>
      </Typography>
    </Box>
  );
}
