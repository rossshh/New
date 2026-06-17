import { Box, Stack, Avatar, Typography, Paper } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import PauseIcon from "@mui/icons-material/Pause";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonIcon from "@mui/icons-material/Person";

// A soft "browser frame" wrapper used by every mock illustration below.
function Frame({
  children,
  height = 320,
  bar,
}: {
  children: React.ReactNode;
  height?: number;
  bar?: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: "1px solid #E2DFD6",
        overflow: "hidden",
        boxShadow: "0 30px 60px -30px rgba(10,63,71,0.25)",
      }}
    >
      <Box
        sx={{
          height: 38,
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          px: 2,
          backgroundColor: "#F6F3EC",
          borderBottom: "1px solid #E2DFD6",
        }}
      >
        <Box sx={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#E2DFD6" }} />
        <Box sx={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#E2DFD6" }} />
        <Box sx={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#E2DFD6" }} />
        {bar}
      </Box>
      <Box sx={{ height, backgroundColor: "#0A3F47", position: "relative" }}>{children}</Box>
    </Paper>
  );
}

export function CallWindowMock() {
  return (
    <Frame
      bar={
        <Typography sx={{ ml: 1, fontSize: "0.78rem", color: "#4B6064", fontWeight: 600 }}>
          doxy.me/drwelch
        </Typography>
      }
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #14606B 0%, #0A3F47 70%)",
        }}
      />
      <Avatar
        sx={{
          width: 96,
          height: 96,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#16C5A8",
        }}
      >
        <PersonIcon sx={{ fontSize: 50 }} />
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          position: "absolute",
          bottom: 14,
          right: 14,
          width: 92,
          height: 64,
          borderRadius: "10px",
          backgroundColor: "#11262A",
          border: "2px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ width: 30, height: 30, backgroundColor: "#0E6E7C" }}>
          <PersonIcon fontSize="small" />
        </Avatar>
      </Paper>
      <Stack
        direction="row"
        spacing={1.2}
        sx={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(17,38,42,0.7)",
          borderRadius: "999px",
          px: 1.5,
          py: 0.8,
        }}
      >
        {[MicIcon, VideocamIcon, ScreenShareIcon, PauseIcon].map((Icon, i) => (
          <Box
            key={i}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Icon sx={{ fontSize: 16 }} />
          </Box>
        ))}
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#E25C5C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <CallEndIcon sx={{ fontSize: 16 }} />
        </Box>
      </Stack>
    </Frame>
  );
}

export function BrowserUrlMock({ url = "doxy.me/drparker" }: { url?: string }) {
  return (
    <Box
      sx={{
        border: "1px solid #E2DFD6",
        borderRadius: "999px",
        px: 3,
        py: 1.6,
        display: "inline-flex",
        alignItems: "center",
        gap: 1.5,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 20px 40px -28px rgba(10,63,71,0.3)",
      }}
    >
      <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#16C5A8" }} />
      <Typography sx={{ fontWeight: 600, color: "#11262A", fontFamily: "monospace" }}>{url}</Typography>
    </Box>
  );
}

export function WaitingRoomMock() {
  const patients = ["A. Reyes", "J. Okafor", "M. Patel"];
  return (
    <Frame
      bar={<Typography sx={{ ml: 1, fontSize: "0.78rem", color: "#4B6064", fontWeight: 600 }}>Patient queue</Typography>}
    >
      <Box sx={{ backgroundColor: "#FFFFFF", height: "100%", p: 2.5 }}>
        <Stack spacing={1.4}>
          {patients.map((p, i) => (
            <Stack
              key={p}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                backgroundColor: "#F6F3EC",
                borderRadius: "12px",
                px: 1.8,
                py: 1.2,
              }}
            >
              <Stack direction="row" spacing={1.4} alignItems="center">
                <Avatar sx={{ width: 32, height: 32, backgroundColor: i === 0 ? "#16C5A8" : "#0E6E7C" }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#11262A" }}>{p}</Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: "#4B6064" }}>
                    {i === 0 ? "Checked in · waiting" : "Confirmed"}
                  </Typography>
                </Box>
              </Stack>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? "#16C5A8" : "#E2DFD6",
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Box>
    </Frame>
  );
}

export function ChatPanelMock() {
  return (
    <Frame
      height={260}
      bar={<Typography sx={{ ml: 1, fontSize: "0.78rem", color: "#4B6064", fontWeight: 600 }}>Session chat</Typography>}
    >
      <Box sx={{ backgroundColor: "#FFFFFF", height: "100%", p: 2.5, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ alignSelf: "flex-start", backgroundColor: "#F6F3EC", borderRadius: "14px", px: 1.8, py: 1, maxWidth: "70%" }}>
          <Typography sx={{ fontSize: "0.85rem" }}>How are you feeling today?</Typography>
        </Box>
        <Box sx={{ alignSelf: "flex-end", backgroundColor: "#0E6E7C", color: "#fff", borderRadius: "14px", px: 1.8, py: 1, maxWidth: "70%" }}>
          <Typography sx={{ fontSize: "0.85rem" }}>Much better, thank you.</Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: "auto" }}>
          <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: "#4B6064" }} />
          <Box sx={{ flexGrow: 1, height: 36, borderRadius: "999px", backgroundColor: "#F6F3EC" }} />
        </Stack>
      </Box>
    </Frame>
  );
}

export function DashboardMock() {
  const rows = ["9:00 AM — D. Nguyen", "9:30 AM — R. Castillo", "10:00 AM — L. Marsh"];
  return (
    <Frame
      bar={<Typography sx={{ ml: 1, fontSize: "0.78rem", color: "#4B6064", fontWeight: 600 }}>Today's schedule</Typography>}
    >
      <Box sx={{ backgroundColor: "#FFFFFF", height: "100%", p: 2.5 }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
          {["Upcoming", "Completed", "Notes"].map((tab, i) => (
            <Box
              key={tab}
              sx={{
                px: 1.6,
                py: 0.6,
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                backgroundColor: i === 0 ? "#0E6E7C" : "#F6F3EC",
                color: i === 0 ? "#fff" : "#4B6064",
              }}
            >
              {tab}
            </Box>
          ))}
        </Stack>
        <Stack spacing={1.2}>
          {rows.map((r) => (
            <Box
              key={r}
              sx={{
                borderLeft: "3px solid #16C5A8",
                backgroundColor: "#F6F3EC",
                borderRadius: "8px",
                px: 1.6,
                py: 1,
              }}
            >
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#11262A" }}>{r}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Frame>
  );
}
