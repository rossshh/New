import { Box, Container, Grid2 as Grid, Typography, Chip, Stack } from "@mui/material";

interface FeatureSplitProps {
  eyebrow?: string;
  title: string;
  description: string;
  tags?: string[];
  imageNode: React.ReactNode;
  reverse?: boolean;
  background?: string;
}

export default function FeatureSplit({
  eyebrow,
  title,
  description,
  tags,
  imageNode,
  reverse,
  background = "#FFFFFF",
}: FeatureSplitProps) {
  return (
    <Box sx={{ backgroundColor: background, py: { xs: 7, md: 11 } }}>
      <Container>
        <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          direction={{ xs: "column", md: reverse ? "row-reverse" : "row" }}
          alignItems="center"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            {eyebrow && (
              <Typography variant="h6" sx={{ color: "#0E6E7C", mb: 1.5 }}>
                {eyebrow}
              </Typography>
            )}
            <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: "1.8rem", md: "2.3rem" } }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: "#4B6064", mb: tags ? 3 : 0 }}>
              {description}
            </Typography>
            {tags && (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      backgroundColor: "#EFEAE0",
                      color: "#11262A",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>{imageNode}</Grid>
        </Grid>
      </Container>
    </Box>
  );
}
