// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#6195CB", // Primary color
    },
    secondary: {
      main: "#294C7B", // Secondary color
    },
    background: {
      default: "#EDE9DA", // Background color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  
});

export default theme;
