import { Box, Container, Grid2 as Grid, Typography, Stack, IconButton, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Overview", to: "/product" },
      { label: "Pricing", to: "/pricing" },
      { label: "What's new", to: "/product" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Security", to: "/about" },
      { label: "Contact", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", to: "/" },
      { label: "Customer stories", to: "/" },
      { label: "Blog", to: "/" },
      { label: "Status", to: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "#0A3F47", color: "rgba(255,255,255,0.85)", pt: { xs: 6, md: 8 }, pb: 4 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo light />
            <Typography sx={{ mt: 2, maxWidth: 280, color: "rgba(255,255,255,0.65)" }}>
              A clone built for demonstration — simple, secure telemedicine, made for providers.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              <IconButton size="small" sx={{ color: "rgba(255,255,255,0.7)" }} aria-label="YouTube">
                <YouTubeIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "rgba(255,255,255,0.7)" }} aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "rgba(255,255,255,0.7)" }} aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "rgba(255,255,255,0.7)" }} aria-label="LinkedIn">
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {columns.map((col) => (
            <Grid size={{ xs: 6, md: 2.5 }} key={col.title}>
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)", mb: 2 }}>
                {col.title}
              </Typography>
              <Stack spacing={1.4}>
                {col.links.map((link) => (
                  <Box
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "0.95rem",
                      "&:hover": { color: "#16C5A8" },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 4 }} />

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            © {new Date().getFullYear()} Doxy.me Clone — built for demonstration purposes only.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Terms of Service</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Privacy Policy</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
