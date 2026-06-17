import { Box, Container, Grid2 as Grid, Typography, Button, Paper } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import DrawIcon from "@mui/icons-material/Draw";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TranslateIcon from "@mui/icons-material/Translate";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Eyebrow from "../components/Eyebrow";
import FeatureSplit from "../components/FeatureSplit";
import ComplianceStrip from "../components/ComplianceStrip";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";
import TestimonialGrid from "../components/TestimonialGrid";
import { CallWindowMock, BrowserUrlMock, WaitingRoomMock, DashboardMock } from "../components/illustrations";

const callFeatures = [
  { title: "Adaptive HD video", desc: "Brilliant when it can be, steady when it must be — your call adjusts to the connection." },
  { title: "Virtual backgrounds", desc: "Choose a clean background to stay focused on care, not what's behind you." },
  { title: "Group calls", desc: "Bring more than one participant into a session when care calls for it." },
  { title: "Screen share", desc: "Some things are easier to show — share information naturally during the visit." },
  { title: "Pause session", desc: "Step away without closing the session, then return seamlessly." },
  { title: "Picture in picture", desc: "Your patient stays in view while you manage other parts of the visit." },
];

const apps = [
  { icon: <HealthAndSafetyIcon />, title: "Scribe", desc: "HIPAA-compliant automated session notes, so you can stay focused on your patient." },
  { icon: <DrawIcon />, title: "Whiteboard", desc: "Draw, type, or annotate with patients — securely and HIPAA-compliant." },
  { icon: <SportsEsportsIcon />, title: "Games", desc: "Lightweight, engaging activities you can bring into a session when it helps." },
  { icon: <TranslateIcon />, title: "Interpreter", desc: "Add a certified interpreter with a single click to support patients in any language." },
];

const workTools = [
  { icon: <PaymentIcon />, title: "Payment", desc: "Accept payments easily before the visit or in the session." },
  { icon: <DescriptionIcon />, title: "Consent forms", desc: "Share, send, and sign consent forms before or during the session." },
  { icon: <BarChartIcon />, title: "Reporting", desc: "See previous visits easily and understand your activity with clear analytics." },
  { icon: <AdminPanelSettingsIcon />, title: "Admin settings", desc: "Set roles and permissions to organize your team with clarity and ease." },
];

const faqItems = [
  { question: "How quickly can I get started?", answer: "Most providers are set up and ready to see patients in under a minute — no downloads required." },
  { question: "How does doxy.me fit into day-to-day clinical workflows?", answer: "Check-in, waiting room, and patient transfer mirror the flow of an in-person practice, just online." },
  { question: "Can providers manage multiple patients or back-to-back visits?", answer: "Yes — the patient queue shows who's waiting so you can move smoothly from one visit to the next." },
  { question: "Is doxy.me a good fit for my practice size and structure?", answer: "From solo practitioners to multi-provider clinics, plans scale with roles, permissions, and shared rooms." },
];

export default function ProductOverview() {
  return (
    <Box>
      <Box sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 5, md: 7 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Eyebrow>Product</Eyebrow>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.3rem", md: "3.2rem" }, mb: 2 }}>
                Secure telehealth. Made simple.
              </Typography>
              <Typography variant="body1" sx={{ color: "#4B6064", mb: 3 }}>
                Provide care for your patients with a simple, HIPAA-compliant telehealth experience.
              </Typography>
              <Button variant="contained" size="large" color="primary">
                Get started for free
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DashboardMock />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <FeatureSplit
        eyebrow="Your practice, anywhere"
        title="Works like your physical location, but online"
        description="Your room link never changes. Patients always know where to go. Zero downloads, zero friction."
        imageNode={<BrowserUrlMock url="doxy.me/drwelch" />}
        background="#F6F3EC"
      />

      {/* Close even when you're not - call features grid */}
      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center" sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Eyebrow>The call experience</Eyebrow>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.3rem" }, mb: 2 }}>
                Close, even when you're not
              </Typography>
              <Typography sx={{ color: "#4B6064" }}>
                Our call experience feels like an engaging, in-person visit, keeping the focus on what
                really matters.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CallWindowMock />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {callFeatures.map((f) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", border: "1px solid #E2DFD6", height: "100%" }}>
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                  <Typography sx={{ color: "#4B6064", fontSize: "0.92rem" }}>{f.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <FeatureSplit
        eyebrow="One link is all they need"
        title="The easiest way to meet patients online"
        description="No apps, no passwords, no friction — just an easy start to every session, available on desktop, tablet, and mobile."
        tags={["Browser-based", "No download required", "No login required", "Any device"]}
        imageNode={<WaitingRoomMock />}
        background="#F6F3EC"
        reverse
      />

      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 4, borderRadius: "18px", backgroundColor: "#F6F3EC", textAlign: "center" }}>
            <Typography sx={{ fontStyle: "italic", fontSize: "1.1rem", mb: 2 }}>
              "Life is chaotic for many of my clients. Doxy.me gives them one simple link they can open
              from anywhere, and suddenly we're together. That ease has opened doors to care in ways I
              never imagined."
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>Mimi</Typography>
            <Typography sx={{ color: "#4B6064", fontSize: "0.9rem" }}>Psychotherapist</Typography>
          </Paper>
        </Container>
      </Box>

      {/* Apps */}
      <Box sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#F6F3EC" }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Eyebrow>Apps</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.3rem" } }}>
              Level up your clinical care with apps
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {apps.map((app) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={app.title}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", height: "100%", backgroundColor: "#FFFFFF" }}>
                  <Box sx={{ color: "#0E6E7C", mb: 1.5 }}>{app.icon}</Box>
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>{app.title}</Typography>
                  <Typography sx={{ color: "#4B6064", fontSize: "0.9rem" }}>{app.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Work tools */}
      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Eyebrow>Practice management</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.3rem" } }}>
              The work behind your care, made simple
            </Typography>
            <Typography sx={{ color: "#4B6064", maxWidth: 520, mx: "auto", mt: 1.5 }}>
              Payments, consent forms, reporting, and team management fit naturally into your workflow.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {workTools.map((tool) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tool.title}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", border: "1px solid #E2DFD6", height: "100%" }}>
                  <Box sx={{ color: "#0E6E7C", mb: 1.5 }}>{tool.icon}</Box>
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>{tool.title}</Typography>
                  <Typography sx={{ color: "#4B6064", fontSize: "0.9rem" }}>{tool.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <TestimonialGrid
        items={[
          {
            quote:
              "Given our innovative approach and rapid growth, we needed something that not only met our workflow needs, but was also easy to manage administratively.",
            name: "Kate Cordisco",
            role: "NP Manager",
          },
        ]}
      />

      <ComplianceStrip
        items={[
          { code: "HIPAA", label: "U.S. healthcare privacy and security rules" },
          { code: "SOC 2", label: "Information security standard by the AICPA" },
          { code: "CPRA", label: "California Privacy Rights Act" },
          { code: "GDPR", label: "European data protection standards" },
        ]}
      />

      <FAQ items={faqItems} />

      <CTABanner />
    </Box>
  );
}
