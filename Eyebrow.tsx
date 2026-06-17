import { Box, Typography } from "@mui/material";

interface EyebrowProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function Eyebrow({ children, light }: EyebrowProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <Box sx={{ width: 18, height: 2, borderRadius: 2, backgroundColor: "#16C5A8" }} />
      <Typography
        variant="h6"
        sx={{
          color: light ? "rgba(255,255,255,0.7)" : "#0E6E7C",
          m: 0,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
