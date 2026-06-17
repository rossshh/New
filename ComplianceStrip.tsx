import { Box, Container, Grid2 as Grid, Typography, Stack } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

interface Item {
  code: string;
  label: string;
}

export default function ComplianceStrip({ items }: { items: Item[] }) {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#FFFFFF" }}>
      <Container>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid size={{ xs: 6, sm: 3 }} key={item.code}>
              <Stack spacing={1.2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    backgroundColor: "#F6F3EC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0E6E7C",
                  }}
                >
                  <VerifiedUserIcon />
                </Box>
                <Typography sx={{ fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {item.code}
                </Typography>
                <Typography sx={{ color: "#4B6064", fontSize: "0.9rem" }}>{item.label}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
