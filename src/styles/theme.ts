import { createTheme } from "@mui/material/styles";

// Editorial, kinetic palette — warm near-black + paper, one loud accent (ember)
// and one acid counter-accent. Deliberately not blue/purple-gradient "AI" default.
export const colors = {
  bg: "#0d0c0a",
  bgSoft: "#151310",
  paper: "#f3ede1",
  ink: "#f3ede1",
  inkOnPaper: "#151310",
  muted: "rgba(243,237,225,0.58)",
  mutedOnPaper: "rgba(21,19,16,0.6)",
  line: "rgba(243,237,225,0.14)",
  lineOnPaper: "rgba(21,19,16,0.14)",
  ember: "#ff4d23",
  lime: "#c8ff4d",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: colors.ember },
    secondary: { main: colors.lime },
    background: { default: colors.bg, paper: colors.bgSoft },
    text: { primary: colors.ink, secondary: colors.muted },
  },
  typography: {
    fontFamily: "var(--font-body), sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: colors.ember,
          color: colors.bg,
        },
        "::-moz-selection": {
          backgroundColor: colors.ember,
          color: colors.bg,
        },
      },
    },
  },
});
