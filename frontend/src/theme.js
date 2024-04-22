// This script configures the theme settings for a React application using Material-UI.
// The createTheme function from MUI's styles module is utilized to customize aesthetics across the app.
// The theme specifies a dark color palette, with designated primary and secondary colors to maintain visual consistency.
// Background color is also defined to enhance readability and comfort for users in a dark mode environment.
// Typography settings are applied globally, employing Roboto as the primary font family for a clean and modern look.
// The defined theme is exported as the default module to be imported and applied within the app's ThemeProvider.
// This setup ensures a cohesive visual style that enhances user interface and experience.

// Created by: Tanner Helton

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
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
