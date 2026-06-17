import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const navLinks = [
  { label: "Product", to: "/product" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: scrolled ? "1px solid #E2DFD6" : "1px solid transparent",
          transition: "border-color 0.2s ease",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1180px",
            width: "100%",
            mx: "auto",
            py: 1.5,
            px: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={RouterLink}
                to={link.to}
                sx={{
                  color: pathname === link.to ? "#0E6E7C" : "#11262A",
                  fontWeight: 600,
                  px: 2,
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5, ml: 2 }}>
            <Button sx={{ color: "#11262A", fontWeight: 600 }}>Sign in</Button>
            <Button variant="contained" color="primary" disableElevation>
              Get started
            </Button>
          </Box>

          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 1 }}>
            <Logo />
            <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton component={RouterLink} to={link.to} onClick={() => setOpen(false)}>
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button fullWidth sx={{ color: "#11262A", fontWeight: 600, justifyContent: "flex-start" }}>
              Sign in
            </Button>
            <Button fullWidth variant="contained" color="primary" disableElevation>
              Get started
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
