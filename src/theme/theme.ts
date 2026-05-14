// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#00ff40ff", // neon principal V11
      light: "#3dff4dff",
      dark: "#00c21aff",
      contrastText: "#000",
    },

    secondary: {
      main: "#00E5FF",
    },

    background: {
      default: "#050505",
      paper: "#0F0F0F",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
      disabled: "#666",
    },

    success: {
      main: "#22c55e"
    },

    grey: {
      900: "#0A0A0A"
    },

    divider: "rgba(255,255,255,0.08)",
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 900,
      letterSpacing: "-1px",
    },

    h2: {
      fontWeight: 800,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;