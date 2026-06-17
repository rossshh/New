import { Box, Container, Grid2 as Grid, Typography, Button, Paper, Avatar, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Eyebrow from "../components/Eyebrow";
import StatStrip from "../components/StatStrip";
import CTABanner from "../components/CTABanner";

export default function About() {
  return (
    <Box>
      <Box sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 5, md: 7 } }}>
        <Container sx={{ textAlign: "center", maxWidth: "760px !important" }}>
          <Eyebrow>About us</Eyebrow>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.3rem", md: "3.2rem" }, mb: 2 }}>
            Built for providers
          </Typography>
          <Typography variant="body1" sx={{ color: "#4B6064" }}>
            Our software is powering telemedicine for millions of providers worldwide — and we're far
            from being done.
          </Typography>
        </Container>
      </Box>

      {/* Our story */}
      <Box sx={{ py: { xs: 6, md: 9 }, backgroundColor: "#F6F3EC" }}>
        <Container>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Eyebrow>Our story</Eyebrow>
              <Typography variant="h3" sx={{ fontSize: "1.6rem", mb: 1 }}>
                Told by Brandon Welch, Founder and CEO
              </Typography>
              <Typography sx={{ color: "#4B6064" }}>
                In 2013, Brandon Welch and Dylan Turner set out to build something very different: a
                simple, secure, and accessible telemedicine platform.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2.5}>
                <Typography sx={{ color: "#11262A" }}>
                  From day one, it was never about building more tech. It was about empowering the people
                  who deliver care — the clinicians, the therapists, the providers who show up every day
                  to support others. Doxy.me was built to support them: to remove the noise, the
                  friction, the barriers, so they could focus on what matters most: helping their
                  patients.
                </Typography>
                <Typography sx={{ color: "#11262A" }}>
                  As a proudly independent company, we've been free to stay true to that mission. Without
                  outside investors or short-term pressures, we build with intention, listen closely to
                  our users, and keep our priorities where they belong — on the people delivering care and
                  the patients receiving it.
                </Typography>
                <Typography sx={{ color: "#11262A" }}>
                  Today, over a million providers across more than 180 countries trust doxy.me to power
                  their care. Together, we've delivered over 12 billion minutes of telemedicine and
                  hundreds of millions of sessions that bring care within reach for anyone, anywhere.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <StatStrip
        stats={[
          { value: "2013", label: "the year doxy.me was founded" },
          { value: "180+", label: "countries with providers on doxy.me" },
          { value: "12B+", label: "minutes of telemedicine delivered" },
        ]}
      />

      {/* Telehealth.org */}
      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Eyebrow>Telehealth.org</Eyebrow>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" }, mb: 2 }}>
                Shaping the future of telemedicine
              </Typography>
              <Typography sx={{ color: "#4B6064", mb: 2 }}>
                Being a healthcare provider requires more than the right technology. Providers need
                training, education, and resources to stay current with the evolving world of
                telemedicine.
              </Typography>
              <Typography sx={{ color: "#4B6064", mb: 3 }}>
                That's why, in 2024, we welcomed Telehealth.org — a leading resource for telemedicine
                support — into the doxy.me family, strengthening our mission to connect the world with
                the future of healthcare.
              </Typography>
              <Button variant="outlined" sx={{ borderColor: "#0E6E7C", color: "#0E6E7C" }}>
                Visit telehealth.org
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #0E6E7C 0%, #0A3F47 100%)",
                  color: "#fff",
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" sx={{ color: "#fff", mb: 1 }}>
                  telehealth.org
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                  Education and resources for the telemedicine community, now part of the doxy.me family.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Founders */}
      <Box sx={{ py: { xs: 7, md: 9 }, backgroundColor: "#F6F3EC" }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Eyebrow>Founders</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
              Started by two people who wanted to do it differently
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {[
              { name: "Brandon Welch", role: "Co-founder & CEO" },
              { name: "Dylan Turner", role: "Co-founder" },
            ].map((person) => (
              <Grid size={{ xs: 12, sm: 5 }} key={person.name}>
                <Paper elevation={0} sx={{ p: 3.5, borderRadius: "18px", textAlign: "center", backgroundColor: "#FFFFFF" }}>
                  <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 2, backgroundColor: "#0E6E7C" }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography sx={{ fontWeight: 700 }}>{person.name}</Typography>
                  <Typography sx={{ color: "#4B6064", fontSize: "0.9rem" }}>{person.role}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CTABanner title="Join the providers we serve" subtitle="See why over a million providers trust doxy.me with their care." />
    </Box>
  );
}
