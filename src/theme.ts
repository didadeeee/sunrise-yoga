import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#828dab",
    },
    secondary: {
      main: "#000000",
      light: "rgb(12, 111, 249)",
    },
    background: {
      default: "#efece7",
    },
    text: {
      secondary: "#FFDEA6",
      primary: "#5A6175",
    //   hint: "#ff0000",
    },
  },
  typography: {
    fontSize: 14,
    fontWeightLight: 200,
  },
});