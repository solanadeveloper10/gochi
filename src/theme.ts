import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c7fe03",
      light: "#86de08",
    },
    secondary: {
      main: "#86de08",
    },
    background: {
      default: "#000",
      paper: "#faf6ef",
    },
    text: {
      primary: "#000",
      secondary: "#000",
    },
    divider: "#e0ddd4",
  },
  typography: {
    fontFamily:
      "'Pixelify Sans', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2.5rem", fontWeight: 600 },
    h3: { fontSize: "2rem", fontWeight: 500 },
    h4: { fontSize: "1.5rem", fontWeight: 500 },
    body1: { fontSize: "0.75rem" },
    body2: { fontSize: "0.75rem", fontWeight: "bold" },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "rgb(39, 57, 0)",
        },
      },
    },
  },
});
