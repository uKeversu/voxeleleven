// src/theme/theme.ts

import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {
    mode: "dark",

    primary: {
      main: "#00ff40ff", // neon principal V11
      light: "#3dff4dff",
      dark: "#00c21aff",
      contrastText: "#000000",
    },

    secondary: {
      main: "#00E5FF",
      light: "#33EBFF",
      dark: "#00A8C4",
      contrastText: "#000000",
    },

    background: {
      default: "#050505",
      paper: "#0F0F0F",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
      disabled: "#666666",
    },

    success: {
      main: "#22c55e",
    },

    grey: {
      900: "#0A0A0A",
      800: "#111111",
      700: "#1A1A1A",
      600: "#222222",
      500: "#666666",
    },

    divider:
      "rgba(255,255,255,0.08)",
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
      letterSpacing: "-1.5px",
    },


    h2: {
      fontWeight: 800,
      letterSpacing: "-1px",
    },


    h3: {
      fontWeight: 800,
    },


    h4: {
      fontWeight: 700,
    },


    h5: {
      fontWeight: 600,
    },


    h6: {
      fontWeight: 600,
    },


    body1: {
      fontSize: "1rem",
    },


    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.2px",
    },

  },


  spacing: 8,


  components: {


    // ==========================
    // BUTTON
    // ==========================

    MuiButton: {

      defaultProps: {
        disableElevation: true,
      },


      styleOverrides: {

        root: {

          borderRadius: 12,

          transition:
            "all .25s ease",


          "&:hover": {

            transform:
              "translateY(-1px)",

          },


        },


      },


      variants: [

        {
          props: {
            variant: "contained",
            color: "primary",
          },

          style: {

            boxShadow:
              "0 0 20px rgba(0,255,64,.25)",


            "&:hover": {

              boxShadow:
                "0 0 35px rgba(0,255,64,.45)",

            },

          },

        },

      ],

    },



    // ==========================
    // ICON BUTTON
    // ==========================

    MuiIconButton: {

      styleOverrides: {

        root: {

          transition:
            "all .25s ease",


          "&:hover": {

            backgroundColor:
              "rgba(0,255,64,.08)",


            color:
              "#00ff40",

          },

        },

      },

    },



    // ==========================
    // PAPER
    // ==========================

    MuiPaper: {

      styleOverrides: {

        root: {

          backgroundImage:
            "none",


          border:
            "1px solid rgba(255,255,255,.06)",

        },

      },

    },



    // ==========================
    // CARD
    // ==========================

    MuiCard: {

      styleOverrides: {

        root: {

          backgroundImage:
            "none",


          border:
            "1px solid rgba(255,255,255,.06)",


          transition:
            "all .3s ease",


          "&:hover": {

            borderColor:
              "rgba(0,255,64,.25)",


            boxShadow:
              "0 0 30px rgba(0,255,64,.12)",

          },

        },

      },

    },



    // ==========================
    // TEXTFIELD
    // ==========================

    MuiTextField: {

      defaultProps: {

        variant:
          "outlined",

      },

    },


    MuiOutlinedInput: {

      styleOverrides: {

        root: {

          borderRadius: 14,

          backgroundColor:
            "rgba(255,255,255,.03)",


          transition:
            "all .25s ease",


          "&:hover": {

            backgroundColor:
              "rgba(255,255,255,.05)",

          },


          "&.Mui-focused": {

            boxShadow:
              "0 0 0 3px rgba(0,255,64,.15)",

          },

        },

        notchedOutline: {

          borderColor:
            "rgba(255,255,255,.12)",

        },

      },

    },



    // ==========================
    // AUTOCOMPLETE
    // ==========================

    MuiAutocomplete: {

      styleOverrides: {

        paper: {

          marginTop: 8,

          borderRadius: 18,

          backgroundColor:
            "#0F0F0F",

          backdropFilter:
            "blur(20px)",

          boxShadow:
            "0 20px 50px rgba(0,0,0,.5)",

        },


        option: {

          borderRadius: 12,

          margin:
            "4px 8px",

          transition:
            "all .2s ease",


          "&[aria-selected='true']": {

            backgroundColor:
              "rgba(0,255,64,.1)",

          },


          "&:hover": {

            backgroundColor:
              "rgba(0,255,64,.08)",

          },

        },

      },

    },



    // ==========================
    // DRAWER
    // ==========================

    MuiDrawer: {

      styleOverrides: {

        paper: {

          backgroundColor:
            "#050505",

          border:
            "1px solid rgba(255,255,255,.08)",

        },

      },

    },



    // ==========================
    // DIALOG
    // ==========================

    MuiDialog: {

      styleOverrides: {

        paper: {

          backgroundColor:
            "#050505",

          backgroundImage:
            "none",

          borderRadius:
            24,

        },

      },

    },



    // ==========================
    // BADGE
    // ==========================

    MuiBadge: {

      styleOverrides: {

        badge: {

          fontWeight:
            800,

          minWidth:
            20,

          height:
            20,

          boxShadow:
            "0 0 10px rgba(0,255,64,.5)",

        },

      },

    },



    // ==========================
    // CHIP
    // ==========================

    MuiChip: {

      styleOverrides: {

        root: {

          borderRadius:
            999,

          fontWeight:
            700,

        },

      },

    },


  },

});


export default theme;