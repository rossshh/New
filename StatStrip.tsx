import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";

interface Stat {
  value: string;
  label: string;
}

export default function StatStrip({ stats, dark }: { stats: Stat[]; dark?: boolean }) {
  return (
    <Box
      sx={{
        backgroundColor: dark ? "#0A3F47" : "#F6F3EC",
        py: { xs: 5, md: 7 },
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 4, md: 2 }}>
          {stats.map((stat) => (
            <Grid size={{ xs: 12, sm: 4 }} key={stat.label} sx={{ textAlign: { xs: "left", sm: "center" } }}>
              <Typography
                sx={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  color: dark ? "#16C5A8" : "#0E6E7C",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography sx={{ color: dark ? "rgba(255,255,255,0.7)" : "#4B6064", mt: 0.5 }}>
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
