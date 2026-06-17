import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Eyebrow from "./Eyebrow";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items, title = "FAQ" }: { items: FAQItem[]; title?: string }) {
  return (
    <Box sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="md">
        <Eyebrow>{title}</Eyebrow>
        <Typography variant="h3" sx={{ mb: 4, fontSize: { xs: "1.7rem", md: "2.1rem" } }}>
          Questions, answered
        </Typography>
        {items.map((item) => (
          <Accordion
            key={item.question}
            elevation={0}
            disableGutters
            sx={{
              border: "1px solid #E2DFD6",
              borderRadius: "14px !important",
              mb: 1.5,
              "&:before": { display: "none" },
              px: 1,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "#4B6064" }}>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
