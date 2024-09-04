import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "inherit",
        fontSize: "var(--font-size-paragraph-primary)",
      },
    },
  },
});

export default chakraTheme;
