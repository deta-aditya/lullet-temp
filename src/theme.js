import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        minHeight: "100vh",
        bgGradient: "linear(180deg, blue.500, blue.100);",
        backgroundRepeat: "no-repeat",
      },
    }),
  },
});

export default theme;
