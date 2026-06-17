import { Box, Container, Grid2 as Grid, Typography, Button, Stack, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Eyebrow from "../components/Eyebrow";
import StatStrip from "../components/StatStrip";
import FeatureSplit from "../components/FeatureSplit";
import ComplianceStrip from "../components/ComplianceStrip";
import TestimonialGrid from "../components/TestimonialGrid";
import CTABanner from "../components/CTABanner";
import { CallWindowMock, BrowserUrlMock, WaitingRoomMock, ChatPanelMock } from "../components/illustrations";

const trustBadges = ["HIPAA-compliant", "SOC 2-certified", "Free BAA", "CPRA-compliant", "End-to-end encrypted", "GDPR-compliant"];

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <Box sx={{ pt: { xs: 7, md: 11 }, pb: { xs: 6, md: 9 }, backgroundColor: "#FFFFFF", overflow: "hidden" }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.4rem", sm: "3rem", md: "3.6rem" },
                  mb: 3,
                }}
              >
                The world's most loved telemedicine platform
              </Typography>
              <Typography variant="body1" sx={{ color: "#4B6064", mb: 4, maxWidth: 480 }}>
                Join over 1 million providers who trust doxy.me to deliver HIPAA-compliant care.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
                <Button variant="contained" size="large" color="primary">
                  Get started for free
                </Button>
                <Button component={RouterLink} to="/pricing" variant="outlined" size="large" sx={{ borderColor: "#0E6E7C", color: "#0E6E7C" }}>
                  Explore plans
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {trustBadges.map((badge) => (
                  <Chip
                    key={badge}
                    icon={<CheckCircleIcon sx={{ fontSize: 16, color: "#16C5A8 !important" }} />}
                    label={badge}
                    size="small"
                    sx={{ backgroundColor: "#F6F3EC", color: "#11262A", fontWeight: 600 }}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CallWindowMock />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <StatStrip
        stats={[
          { value: "1M+", label: "providers trust doxy.me" },
          { value: "12B+", label: "minutes of telehealth delivered" },
          { value: "1.3M", label: "sessions delivered every week" },
        ]}
      />

      {/* Inspired by care */}
      <Box sx={{ py: { xs: 7, md: 10 } }}>
        <Container sx={{ textAlign: "center", maxWidth: "760px !important" }}>
          <Eyebrow>Built for healthcare</Eyebrow>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, mb: 2 }}>
            Inspired by care. Designed for providers.
          </Typography>
          <Typography variant="body1" sx={{ color: "#4B6064" }}>
            Doxy.me is the leading video platform solely for healthcare professionals, simplifying how
            you connect with patients remotely.
          </Typography>
        </Container>
      </Box>

      <FeatureSplit
        eyebrow="Easy to integrate"
        title="Works instantly with your existing workflow"
        description="No extra setup required. One link is all your patients need — no downloads, no accounts, no friction."
        tags={["One URL", "No downloads", "No patient login", "Browser-friendly"]}
        imageNode={<BrowserUrlMock />}
        background="#F6F3EC"
      />

      <FeatureSplit
        eyebrow="Advanced video features"
        title="Powerful tools that keep sessions clear and focused"
        description="Group calls, screen sharing, virtual backgrounds, and the ability to pause a session — everything stays centered on the visit."
        tags={["Group call", "Pause", "Virtual background", "Screen share"]}
        imageNode={<ChatPanelMock />}
        reverse
      />

      <FeatureSplit
        eyebrow="Familiar clinical workflows"
        title="Keep virtual care organized and professional"
        description="A waiting room, check-in, and patient transfer make remote visits feel as structured as your physical practice."
        tags={["Check-in", "Waiting room", "Patient transfer", "Shared rooms"]}
        imageNode={<WaitingRoomMock />}
        background="#F6F3EC"
      />

      <ComplianceStrip
        items={[
          { code: "HIPAA", label: "U.S. healthcare privacy and security rules" },
          { code: "SOC 2", label: "Information security standard by the AICPA" },
          { code: "CPRA", label: "California Privacy Rights Act" },
          { code: "GDPR", label: "European data protection standards" },
        ]}
      />

      <TestimonialGrid
        items={[
          {
            quote: "A phenomenal platform that has continued to give back in numerous ways.",
            name: "Cade Kirkhart",
            role: "LCPC-S",
          },
          {
            quote: "It meets all of my needs as a sole practitioner. Thank you so much!",
            name: "Hilary Jackson",
            role: "Owner, Goodtherapy",
          },
        ]}
      />

      <CTABanner />
    </Box>
  );
}
