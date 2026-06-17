import { Box, Container, Grid2 as Grid, Typography, Button, Paper, Stack, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Eyebrow from "../components/Eyebrow";
import StatStrip from "../components/StatStrip";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";
import { DashboardMock } from "../components/illustrations";

const featureCategories = [
  {
    title: "Care delivery",
    description: "Tools that support each visit for clear, effective care.",
    items: [
      "Unlimited calls",
      "Chat during sessions",
      "Screen sharing",
      "Picture-in-picture",
      "Virtual backgrounds",
      "Group calls — up to 25 participants",
      "Automated notetaking & session summaries",
    ],
  },
  {
    title: "Care coordination",
    description: "Keep care flowing across people, steps, and sessions.",
    items: [
      "Virtual waiting room & patient queue",
      "Invite patients via email or SMS",
      "Real-time notifications",
      "Shared rooms for team-based care",
      "Patient transfer & routing",
    ],
  },
  {
    title: "Clinic management",
    description: "Set up and scale your practice with structure and control.",
    items: [
      "Multi-user capable",
      "Roles and permissions",
      "Clinic-level reporting & analytics",
      "Custom branding across your clinic",
      "Intake and consent workflows",
    ],
  },
  {
    title: "Security & compliance",
    description: "Protect patient privacy with built-in security standards.",
    items: ["HIPAA compliant", "BAA included", "Secure, privacy-first infrastructure"],
  },
];

const faqItems = [
  {
    question: "Are there discounts for non-profits, students, or researchers?",
    answer:
      "Yes — reach out to our team with details about your organization and we'll help find a plan that fits.",
  },
  {
    question: "Is there any long-term commitment?",
    answer: "No. Premium plans are billed monthly or annually and can be cancelled or downgraded anytime.",
  },
  {
    question: "Do you charge sales tax?",
    answer: "Sales tax may apply depending on your billing region and local regulations.",
  },
  {
    question: "Do you offer a Free Plan?",
    answer: "Yes — the Free plan includes unlimited one-on-one calls and never requires a credit card.",
  },
];

export default function Pricing() {
  return (
    <Box>
      <Box sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 4, md: 6 } }}>
        <Container sx={{ textAlign: "center", maxWidth: "720px !important" }}>
          <Eyebrow>Pricing</Eyebrow>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, mb: 2 }}>
            From free to fully featured
          </Typography>
          <Typography variant="body1" sx={{ color: "#4B6064" }}>
            Plans for providers and clinics of every size — including unlimited calls, HIPAA compliance,
            and clinic management tools.
          </Typography>
        </Container>
      </Box>

      {/* Plan cards */}
      <Container sx={{ pb: { xs: 6, md: 9 } }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2DFD6", height: "100%" }}>
              <Typography variant="h6" sx={{ color: "#0E6E7C" }}>
                Free Plan
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, mb: 1 }}>
                $0
              </Typography>
              <Typography sx={{ color: "#4B6064", mb: 3 }}>
                For providers just getting started with telehealth.
              </Typography>
              <Button variant="outlined" fullWidth size="large" sx={{ borderColor: "#0E6E7C", color: "#0E6E7C", mb: 3 }}>
                Get started now
              </Button>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {["Unlimited one-on-one calls", "Browser-based, no downloads", "HIPAA-compliant with free BAA"].map((f) => (
                  <ListItem key={f} disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckIcon sx={{ color: "#16C5A8", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={f} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "20px",
                height: "100%",
                background: "linear-gradient(135deg, #0E6E7C 0%, #0A3F47 100%)",
                color: "#fff",
              }}
            >
              <Typography variant="h6" sx={{ color: "#16C5A8" }}>
                Premium Plan
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, mb: 0.5, color: "#fff" }}>
                Built for care, not just calls
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
                Per user / month, billed annually. Workflows for any size team, plus clinical tools
                providers can rely on.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ backgroundColor: "#16C5A8", color: "#06302A", mb: 1, "&:hover": { backgroundColor: "#0FA391" } }}
              >
                Start your free trial
              </Button>
              <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", mb: 3 }}>
                No credit card required. Cancel or downgrade anytime.
              </Typography>
              <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.15)" }} />
              <List dense>
                {["Everything in Free, plus:", "Group calls & screen share", "Clinic management & reporting"].map((f) => (
                  <ListItem key={f} disableGutters>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckIcon sx={{ color: "#16C5A8", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={f} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <StatStrip
        stats={[
          { value: "1.5M+", label: "care providers trust doxy.me" },
          { value: "14B+", label: "minutes of telehealth delivered" },
        ]}
        dark
      />

      {/* Feature categories */}
      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Eyebrow>What's included</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.3rem" } }}>
              Everything your practice needs
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {featureCategories.map((cat) => (
              <Grid size={{ xs: 12, sm: 6 }} key={cat.title}>
                <Paper elevation={0} sx={{ p: 3.5, borderRadius: "18px", border: "1px solid #E2DFD6", height: "100%" }}>
                  <Typography variant="h4" sx={{ fontSize: "1.2rem", mb: 0.5 }}>
                    {cat.title}
                  </Typography>
                  <Typography sx={{ color: "#4B6064", mb: 2 }}>{cat.description}</Typography>
                  <List dense>
                    {cat.items.map((item) => (
                      <ListItem key={item} disableGutters>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <CheckIcon sx={{ color: "#16C5A8", fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: "0.92rem" }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Telehealth for every provider */}
      <Box sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#F6F3EC" }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" }, mb: 2 }}>
                Telehealth for every provider
              </Typography>
              <Typography sx={{ color: "#4B6064", mb: 2 }}>
                Everyone should have access to telemedicine. Cost should never be a barrier to offering a
                simple and secure video option to your patients.
              </Typography>
              <Typography sx={{ color: "#4B6064", mb: 3 }}>
                That's why we offer a completely free version for providers who are just getting started,
                don't use telehealth often, or can't take on another cost.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Get started now
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DashboardMock />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <FAQ items={faqItems} />

      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container sx={{ textAlign: "center" }}>
          <Stack spacing={1.5} alignItems="center">
            <Typography variant="h4" sx={{ fontSize: "1.4rem" }}>
              Have questions about custom solutions?
            </Typography>
            <Typography sx={{ color: "#4B6064", maxWidth: 420 }}>
              Reach out to explore options, ask questions, and find what fits best.
            </Typography>
            <Button variant="outlined" sx={{ borderColor: "#0E6E7C", color: "#0E6E7C", mt: 1 }}>
              Request a demo
            </Button>
          </Stack>
        </Container>
      </Box>

      <CTABanner />
    </Box>
  );
}
