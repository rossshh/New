import { Box, Container, Typography, Button, Stack } from "@mui/material";

export default function CTABanner({
  title = "See your patients today",
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0E6E7C 0%, #0A3F47 100%)",
        py: { xs: 7, md: 10 },
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{ color: "#fff", fontSize: { xs: "2rem", md: "2.6rem" }, mb: subtitle ? 1.5 : 4 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: "rgba(255,255,255,0.75)", mb: 4, maxWidth: 520, mx: "auto" }}>
            {subtitle}
          </Typography>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#16C5A8", color: "#06302A", "&:hover": { backgroundColor: "#0FA391" } }}
          >
            Get started for free
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", "&:hover": { borderColor: "#fff" } }}
          >
            Explore plans
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
