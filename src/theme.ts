/* theme.ts */
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

export const theme: ThemeConfig = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: true,
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
});
