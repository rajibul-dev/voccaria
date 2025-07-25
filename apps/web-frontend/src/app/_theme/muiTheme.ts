import { createTheme } from "@mui/material";
import colors from "tailwindcss/colors";
import Color from "colorjs.io";

function oklchToHex(oklchColor: string): string {
  const color = new Color(oklchColor).to("srgb"); // convert to sRGB
  const [r, g, b] = color.coords.map((c) => Math.round(c * 255));

  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export const lightTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: {
      textTransform: "capitalize",
    },
  },
  palette: {
    mode: "light",
    primary: {
      light: "#f787be", // my-pink-300
      main: "#d80e70", // my-pink-600
      dark: "#a80b57", // my-pink-700
      contrastText: oklchToHex(colors.white),
    },
    secondary: {
      light: oklchToHex(colors.slate[200]),
      main: oklchToHex(colors.slate[600]),
      dark: oklchToHex(colors.slate[800]),
    },
    grey: {
      "50": oklchToHex(colors.gray[50]),
      "100": oklchToHex(colors.gray[100]),
      "200": oklchToHex(colors.gray[200]),
      "300": oklchToHex(colors.gray[300]),
      "400": oklchToHex(colors.gray[400]),
      "500": oklchToHex(colors.gray[500]),
      "600": oklchToHex(colors.gray[600]),
      "700": oklchToHex(colors.gray[700]),
      "800": oklchToHex(colors.gray[800]),
      "900": oklchToHex(colors.gray[900]),
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: {
      textTransform: "capitalize",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#f787be", // my pink 300
      main: "#d80e70", // my pink 600
      dark: "#a80b57", // my pink 700
      contrastText: oklchToHex(colors.white),
    },
    secondary: {
      light: oklchToHex(colors.slate[200]),
      main: oklchToHex(colors.slate[600]),
      dark: oklchToHex(colors.slate[800]),
    },
    grey: {
      "50": oklchToHex(colors.gray[50]),
      "100": oklchToHex(colors.gray[100]),
      "200": oklchToHex(colors.gray[200]),
      "300": oklchToHex(colors.gray[300]),
      "400": oklchToHex(colors.gray[400]),
      "500": oklchToHex(colors.gray[500]),
      "600": oklchToHex(colors.gray[600]),
      "700": oklchToHex(colors.gray[700]),
      "800": oklchToHex(colors.gray[800]),
      "900": oklchToHex(colors.gray[900]),
    },
  },
});
