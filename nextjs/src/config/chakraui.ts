import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "inherit",
        fontSize: "var(--font-size-paragraph-primary)",
        wordSpacing: "0.8pt",
      },
    },
  },
  breakpoints: {
    pricingOneCol: "54.125em",
  },
});

export default chakraTheme;
