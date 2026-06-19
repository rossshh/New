/**
 * VideoCallRoom.tsx
 *
 * Doxy.me-style telemedicine video call UI
 * Stack : React 18 + TypeScript + Material UI v5
 * Video : LiveKit (slots wired — connect your <LiveKitRoom> wrapper above this)
 * Chat  : SignalR (hook stub at bottom — wire HubConnection there)
 *
 * Props
 * ─────
 *  remoteVideoRef  – ref to attach remote <video> element (LiveKit track)
 *  localVideoRef   – ref to attach local  <video> element (LiveKit track)
 *  onEndCall       – called when the red hang-up button is pressed
 *  participantName – display name of the remote participant
 *  signalRHub      – optional HubConnection (SignalR) for chat messages
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  RefObject,
} from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Drawer,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  Chip,
  Divider,
  Fade,
  Zoom,
} from "@mui/material";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";

/* ── MUI icons ── */
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ClosedCaptionOffIcon from "@mui/icons-material/ClosedCaptionOff";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import StopScreenShareOutlinedIcon from "@mui/icons-material/StopScreenShareOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* ═══════════════════════════════════════════════
   Theme — near-black surface, cool-slate accents
═══════════════════════════════════════════════ */
const callTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0f1012", paper: "#1a1c20" },
    primary: { main: "#4f9cf9" },
    error: { main: "#e5373a" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  shape: { borderRadius: 10 },
});

/* ═══════════════════════════════════════════════
   Types
═══════════════════════════════════════════════ */
interface ChatMessage {
  id: string;
  sender: "me" | "remote";
  senderName: string;
  text: string;
  time: Date;
}

interface VideoCallRoomProps {
  /** Attach your LiveKit remote video track to this ref */
  remoteVideoRef?: RefObject<HTMLVideoElement>;
  /** Attach your LiveKit local video track to this ref */
  localVideoRef?: RefObject<HTMLVideoElement>;
  /** Called when user clicks hang-up */
  onEndCall?: () => void;
  /** Remote participant display name */
  participantName?: string;
  /** Your own display name */
  localName?: string;
  /**
   * Wire an active SignalR HubConnection here.
   * The component calls hub.on("ReceiveMessage", ...) and
   * hub.invoke("SendMessage", ...) automatically.
   */
  signalRHub?: any; // HubConnection from @microsoft/signalr
}

/* ═══════════════════════════════════════════════
   Toolbar icon-button factory
═══════════════════════════════════════════════ */
const TOOLBAR_BTN_SIZE = 42;

function ToolbarBtn({
  label,
  active = true,
  onClick,
  children,
  color = "default",
  badge,
  chevron,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  color?: "default" | "error";
  badge?: number;
  chevron?: boolean;
}) {
  const bg =
    color === "error"
      ? "#e5373a"
      : active
      ? "rgba(255,255,255,0.12)"
      : "rgba(255,255,255,0.07)";

  return (
    <Tooltip title={label} placement="top" arrow>
      <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <IconButton
          onClick={onClick}
          size="small"
          sx={{
            width: TOOLBAR_BTN_SIZE,
            height: TOOLBAR_BTN_SIZE,
            bgcolor: bg,
            color: active ? "#fff" : "rgba(255,255,255,0.45)",
            borderRadius: "50%",
            "&:hover": {
              bgcolor:
                color === "error"
                  ? "#c62828"
                  : "rgba(255,255,255,0.22)",
            },
            transition: "background 0.18s",
          }}
        >
          {badge !== undefined && badge > 0 ? (
            <Badge badgeContent={badge} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 16, height: 16 } }}>
              {children}
            </Badge>
          ) : (
            children
          )}
        </IconButton>
        {/* small chevron indicator (for camera/mic "expand" affordance) */}
        {chevron && (
          <Box
            sx={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 14,
              height: 14,
              borderRadius: "50%",
              bgcolor: "#2a2d33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              pointerEvents: "none",
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }} />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}

/* ═══════════════════════════════════════════════
   useCallTimer
═══════════════════════════════════════════════ */
function useCallTimer() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins} min ${String(secs).padStart(2, "0")} sec`;
}

/* ═══════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════ */
export default function VideoCallRoom({
  remoteVideoRef: externalRemoteRef,
  localVideoRef: externalLocalRef,
  onEndCall,
  participantName = "Monique Walker",
  localName = "You",
  signalRHub,
}: VideoCallRoomProps) {
  /* ── device state ── */
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── panels ── */
  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [unreadChat, setUnreadChat] = useState(0);

  /* ── chat ── */
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "remote",
      senderName: participantName,
      text: "Hello, can you hear me clearly?",
      time: new Date(Date.now() - 90_000),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  /* ── video refs (fallback internal) ── */
  const internalRemoteRef = useRef<HTMLVideoElement>(null);
  const internalLocalRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = externalRemoteRef ?? internalRemoteRef;
  const localVideoRef = externalLocalRef ?? internalLocalRef;

  const containerRef = useRef<HTMLDivElement>(null);
  const callDuration = useCallTimer();

  /* ── SignalR: receive messages ── */
  useEffect(() => {
    if (!signalRHub) return;
    signalRHub.on(
      "ReceiveMessage",
      (senderName: string, text: string) => {
        const msg: ChatMessage = {
          id: Date.now().toString(),
          sender: "remote",
          senderName,
          text,
          time: new Date(),
        };
        setMessages((prev) => [...prev, msg]);
        if (!chatOpen) setUnreadChat((n) => n + 1);
      }
    );
    return () => signalRHub.off("ReceiveMessage");
  }, [signalRHub, chatOpen]);

  /* ── auto-scroll chat ── */
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── reset unread on open ── */
  useEffect(() => {
    if (chatOpen) setUnreadChat(0);
  }, [chatOpen]);

  /* ── fullscreen ── */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  /* ── hide controls on idle ── */
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3500);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHideTimer]);

  /* ── send chat ── */
  const sendMessage = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      senderName: localName,
      text,
      time: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    setChatInput("");
    // SignalR send
    if (signalRHub) {
      signalRHub.invoke("SendMessage", localName, text).catch(console.error);
    }
  }, [chatInput, localName, signalRHub]);

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const drawerWidth = 320;

  return (
    <ThemeProvider theme={callTheme}>
      {/* ── Root container ── */}
      <Box
        ref={containerRef}
        onMouseMove={resetHideTimer}
        onMouseLeave={() => setShowControls(false)}
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          bgcolor: "#0f1012",
          overflow: "hidden",
          userSelect: "none",
          display: "flex",
        }}
      >
        {/* ════════════════════════════════
            MAIN VIDEO (remote participant)
        ════════════════════════════════ */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {/* Remote video element — LiveKit attaches track here */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            muted={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              background: "#1a1c20",
            }}
          />

          {/* Placeholder when camera is off or before connection */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#1e2128",
              // hide once video plays — LiveKit will flip display on the <video>
              pointerEvents: "none",
            }}
          >
            <Avatar
              sx={{
                width: 96,
                height: 96,
                fontSize: 40,
                bgcolor: alpha("#4f9cf9", 0.18),
                color: "#4f9cf9",
                border: "2px solid",
                borderColor: alpha("#4f9cf9", 0.3),
              }}
            >
              {participantName.charAt(0)}
            </Avatar>
          </Box>

          {/* ── Subtle gradient overlays ── */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 18%, transparent 72%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Participant name label (bottom-left) ── */}
          <Fade in={showControls}>
            <Box
              sx={{
                position: "absolute",
                bottom: 80,
                left: 16,
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                bgcolor: "rgba(0,0,0,0.52)",
                backdropFilter: "blur(6px)",
                borderRadius: 999,
                px: 1.25,
                py: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#fff", fontWeight: 500, letterSpacing: 0.2 }}
              >
                {participantName}
              </Typography>
              {/* mic status indicator */}
              <MicIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }} />
            </Box>
          </Fade>

          {/* ── Captions strip ── */}
          <Fade in={captionsOn}>
            <Box
              sx={{
                position: "absolute",
                bottom: 88,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                borderRadius: 2,
                px: 3,
                py: 1,
                maxWidth: "70%",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "#fff", lineHeight: 1.5 }}>
                Live captions will appear here once connected…
              </Typography>
            </Box>
          </Fade>

          {/* ════════════════════════════════
              SELF-VIEW PiP (top-right)
          ════════════════════════════════ */}
          <Box
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              width: { xs: 120, sm: 180, md: 210 },
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
              border: "1.5px solid rgba(255,255,255,0.12)",
              bgcolor: "#2a2d33",
              zIndex: 10,
            }}
          >
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Camera off placeholder */}
            {!camOn && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#2a2d33",
                }}
              >
                <VideocamOffIcon sx={{ color: "rgba(255,255,255,0.35)", fontSize: 28 }} />
              </Box>
            )}
            {/* "You" label */}
            <Box
              sx={{
                position: "absolute",
                bottom: 6,
                left: 8,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "rgba(0,0,0,0.55)",
                borderRadius: 999,
                px: 1,
                py: 0.25,
              }}
            >
              <Typography variant="caption" sx={{ color: "#fff", fontSize: 11, fontWeight: 500 }}>
                {localName}
              </Typography>
              <MicIcon sx={{ fontSize: 11, color: micOn ? "#fff" : "#ef5350" }} />
            </Box>
          </Box>

          {/* ════════════════════════════════
              BOTTOM TOOLBAR
          ════════════════════════════════ */}
          <Fade in={showControls}>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 72,
                display: "flex",
                alignItems: "center",
                px: 3,
                bgcolor: "rgba(18,20,24,0.88)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* ── Left: participants + timer ── */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                <ToolbarBtn
                  label="Participants"
                  onClick={() => { setParticipantsOpen((o) => !o); setChatOpen(false); }}
                >
                  <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />
                </ToolbarBtn>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 0.5, fontSize: 12, minWidth: 90 }}
                >
                  {callDuration}
                </Typography>
              </Box>

              {/* ── Centre: main controls ── */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* Camera */}
                <ToolbarBtn
                  label={camOn ? "Turn off camera" : "Turn on camera"}
                  active={camOn}
                  onClick={() => setCamOn((v) => !v)}
                  chevron
                >
                  {camOn
                    ? <VideocamIcon sx={{ fontSize: 20 }} />
                    : <VideocamOffIcon sx={{ fontSize: 20 }} />}
                </ToolbarBtn>

                {/* Mic */}
                <ToolbarBtn
                  label={micOn ? "Mute" : "Unmute"}
                  active={micOn}
                  onClick={() => setMicOn((v) => !v)}
                  chevron
                >
                  {micOn
                    ? <MicIcon sx={{ fontSize: 20 }} />
                    : <MicOffIcon sx={{ fontSize: 20 }} />}
                </ToolbarBtn>

                {/* Grid / layout */}
                <ToolbarBtn label="Change layout">
                  <GridViewOutlinedIcon sx={{ fontSize: 20 }} />
                </ToolbarBtn>

                {/* Captions */}
                <ToolbarBtn
                  label={captionsOn ? "Hide captions" : "Show captions"}
                  active={captionsOn}
                  onClick={() => setCaptionsOn((v) => !v)}
                >
                  <ClosedCaptionOffIcon sx={{ fontSize: 20 }} />
                </ToolbarBtn>

                {/* More */}
                <ToolbarBtn label="More options">
                  <MoreVertIcon sx={{ fontSize: 20 }} />
                </ToolbarBtn>

                {/* End call */}
                <ToolbarBtn
                  label="End call"
                  color="error"
                  onClick={onEndCall}
                >
                  <CallEndIcon sx={{ fontSize: 22 }} />
                </ToolbarBtn>
              </Box>

              {/* ── Right: screen share + chat + fullscreen ── */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, justifyContent: "flex-end" }}>
                {/* Screen share */}
                <ToolbarBtn
                  label={screenSharing ? "Stop sharing" : "Share screen"}
                  active={screenSharing}
                  onClick={() => setScreenSharing((v) => !v)}
                >
                  {screenSharing
                    ? <StopScreenShareOutlinedIcon sx={{ fontSize: 20 }} />
                    : <ScreenShareOutlinedIcon sx={{ fontSize: 20 }} />}
                </ToolbarBtn>

                {/* Chat */}
                <ToolbarBtn
                  label="Chat"
                  onClick={() => { setChatOpen((o) => !o); setParticipantsOpen(false); }}
                  badge={!chatOpen ? unreadChat : 0}
                >
                  <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
                </ToolbarBtn>

                {/* Fullscreen */}
                <ToolbarBtn label={isFullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={toggleFullscreen}>
                  {isFullscreen
                    ? <FullscreenExitIcon sx={{ fontSize: 20 }} />
                    : <FullscreenIcon sx={{ fontSize: 20 }} />}
                </ToolbarBtn>
              </Box>
            </Box>
          </Fade>
        </Box>

        {/* ════════════════════════════════
            CHAT SIDE PANEL
        ════════════════════════════════ */}
        <Drawer
          variant="persistent"
          anchor="right"
          open={chatOpen}
          PaperProps={{
            sx: {
              width: drawerWidth,
              position: "absolute",
              height: "100%",
              bgcolor: "#1a1c20",
              border: "none",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff" }}>
              In-call chat
            </Typography>
            <IconButton size="small" onClick={() => setChatOpen(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Message list */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.12)", borderRadius: 2 },
            }}
          >
            {messages.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.4)", mb: 0.4, px: 0.5 }}
                  >
                    {isMe ? "You" : msg.senderName} · {fmtTime(msg.time)}
                  </Typography>
                  <Box
                    sx={{
                      maxWidth: "82%",
                      px: 1.5,
                      py: 0.75,
                      bgcolor: isMe ? "#4f9cf9" : "rgba(255,255,255,0.08)",
                      borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#fff", lineHeight: 1.45, wordBreak: "break-word" }}>
                      {msg.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <div ref={chatBottomRef} />
          </Box>

          {/* Input */}
          <Box sx={{ px: 2, py: 1.5, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Send a message…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              multiline
              maxRows={3}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={sendMessage}
                      disabled={!chatInput.trim()}
                      sx={{ color: chatInput.trim() ? "#4f9cf9" : "rgba(255,255,255,0.25)" }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "rgba(255,255,255,0.06)",
                  borderRadius: 3,
                  color: "#fff",
                  fontSize: 14,
                  "& fieldset": { border: "1px solid rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.22) !important" },
                  "&.Mui-focused fieldset": { borderColor: "#4f9cf9 !important" },
                },
              }}
            />
          </Box>
        </Drawer>

        {/* ════════════════════════════════
            PARTICIPANTS SIDE PANEL
        ════════════════════════════════ */}
        <Drawer
          variant="persistent"
          anchor="right"
          open={participantsOpen}
          PaperProps={{
            sx: {
              width: drawerWidth,
              position: "absolute",
              height: "100%",
              bgcolor: "#1a1c20",
              border: "none",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff" }}>
              Participants
              <Chip label="2" size="small" sx={{ ml: 1, height: 18, fontSize: 11, bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }} />
            </Typography>
            <IconButton size="small" onClick={() => setParticipantsOpen(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
            {[
              { name: participantName, sub: "Patient", mic: true },
              { name: localName === "You" ? "You (Host)" : localName, sub: "Provider", mic: micOn },
            ].map((p) => (
              <Box
                key={p.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    fontSize: 15,
                    bgcolor: alpha("#4f9cf9", 0.2),
                    color: "#4f9cf9",
                  }}
                >
                  {p.name.charAt(0)}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                    {p.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>
                    {p.sub}
                  </Typography>
                </Box>
                {p.mic
                  ? <MicIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }} />
                  : <MicOffIcon sx={{ fontSize: 16, color: "#ef5350" }} />}
              </Box>
            ))}

            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.07)" }} />
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", px: 1 }}>
              Others in waiting room
            </Typography>
            <Box sx={{ px: 1, py: 1 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
                No one waiting
              </Typography>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

/*
  ══════════════════════════════════════════════
  USAGE EXAMPLE (in your page component)
  ══════════════════════════════════════════════

  import { useRef } from "react";
  import { Room, createLocalTracks } from "livekit-client";
  import * as signalR from "@microsoft/signalr";
  import VideoCallRoom from "./VideoCallRoom";

  export default function ConsultationPage() {
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef  = useRef<HTMLVideoElement>(null);

    // 1️⃣  Connect LiveKit
    useEffect(() => {
      const room = new Room();
      room.connect(LIVEKIT_URL, TOKEN).then(async () => {
        const tracks = await createLocalTracks({ audio: true, video: true });
        tracks.forEach(t => room.localParticipant.publishTrack(t));
        // attach local video
        const camTrack = tracks.find(t => t.kind === "video");
        camTrack?.attach(localVideoRef.current!);
        // attach remote video on participant connect
        room.on("trackSubscribed", (track, pub, participant) => {
          if (track.kind === "video") track.attach(remoteVideoRef.current!);
        });
      });
      return () => { room.disconnect(); };
    }, []);

    // 2️⃣  Connect SignalR
    const hubRef = useRef<signalR.HubConnection>();
    useEffect(() => {
      const hub = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .withAutomaticReconnect()
        .build();
      hub.start();
      hubRef.current = hub;
      return () => { hub.stop(); };
    }, []);

    return (
      <VideoCallRoom
        remoteVideoRef={remoteVideoRef}
        localVideoRef={localVideoRef}
        participantName="Monique Walker"
        localName="Dr. Patel"
        signalRHub={hubRef.current}
        onEndCall={() => navigate("/dashboard")}
      />
    );
  }
*/
