import { Box, Container, Paper, Typography, Avatar, Stack, Grid2 as Grid } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PersonIcon from "@mui/icons-material/Person";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialGrid({ items, background = "#F6F3EC" }: { items: Testimonial[]; background?: string }) {
  return (
    <Box sx={{ py: { xs: 7, md: 9 }, backgroundColor: background }}>
      <Container>
        <Grid container spacing={3}>
          {items.map((t) => (
            <Grid size={{ xs: 12, md: 12 / items.length }} key={t.name}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: "100%",
                  borderRadius: "18px",
                  border: "1px solid #E2DFD6",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <FormatQuoteIcon sx={{ color: "#16C5A8", fontSize: 30, mb: 1 }} />
                <Typography sx={{ color: "#11262A", mb: 3 }}>{t.quote}</Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ backgroundColor: "#0E6E7C", width: 38, height: 38 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</Typography>
                    <Typography sx={{ color: "#4B6064", fontSize: "0.8rem" }}>{t.role}</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
