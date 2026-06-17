import { createTheme } from "@mui/material/styles";

// Design tokens — calm clinical teal, warm paper, confident type.
export const tokens = {
  teal900: "#0A3F47",
  teal700: "#0E6E7C",
  teal600: "#147F8D",
  teal400: "#3FA6AC",
  mint: "#16C5A8",
  mintDark: "#0FA391",
  paper: "#F6F3EC",
  paperDeep: "#EFEAE0",
  ink: "#11262A",
  inkSoft: "#4B6064",
  line: "#E2DFD6",
};

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.teal700,
      dark: tokens.teal900,
      light: tokens.teal400,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: tokens.mint,
      dark: tokens.mintDark,
      contrastText: "#06302A",
    },
    background: {
      default: "#FFFFFF",
      paper: tokens.paper,
    },
    text: {
      primary: tokens.ink,
      secondary: tokens.inkSoft,
    },
    divider: tokens.line,
  },
  typography: {
    fontFamily: '"Inter", "Plus Jakarta Sans", system-ui, sans-serif',
    h1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.015em",
      lineHeight: 1.12,
    },
    h3: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.18,
    },
    h4: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      fontSize: "0.78rem",
    },
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.65,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 22,
          paddingRight: 22,
          paddingTop: 11,
          paddingBottom: 11,
          boxShadow: "none",
        },
        containedPrimary: {
          "&:hover": {
            boxShadow: "none",
            backgroundColor: tokens.teal900,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1180px !important",
        },
      },
    },
  },
});

export default theme;
