import { useMediaQuery } from "@chakra-ui/react";

// Breakpoint constants (in pixels)
const BREAKPOINTS = {
  xs: 350,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

type DeviceSizes = {
  isXsMobile: boolean; // Max 350px
  isMobile: boolean; // Max 640px
  isTablet: boolean; // 641px - 768px
  isSmallLaptop: boolean; // 769px - 1024px
  isLaptop: boolean; // 1025px - 1280px
  isDesktop: boolean; // 1281px - 1536px
  isLargeDesktop: boolean; // > 1536px
};

export const useDeviceSizes = (): DeviceSizes => {
  // Individual breakpoint queries
  const [isXsMobile] = useMediaQuery(`(max-width:${BREAKPOINTS.xs}px)`, {
    ssr: true,
    fallback: true,
  });

  const [isMobile] = useMediaQuery(`(max-width:${BREAKPOINTS.sm}px)`, {
    ssr: true,
    fallback: true,
  });

  const [isTablet] = useMediaQuery(
    `(min-width:${BREAKPOINTS.sm + 1}px) and (max-width:${BREAKPOINTS.md}px)`,
    {
      ssr: true,
      fallback: false,
    }
  );

  const [isSmallLaptop] = useMediaQuery(
    `(min-width:${BREAKPOINTS.md + 1}px) and (max-width:${BREAKPOINTS.lg}px)`,
    {
      ssr: true,
      fallback: false,
    }
  );

  const [isLaptop] = useMediaQuery(
    `(min-width:${BREAKPOINTS.lg + 1}px) and (max-width:${BREAKPOINTS.xl}px)`,
    {
      ssr: true,
      fallback: false,
    }
  );

  const [isDesktop] = useMediaQuery(
    `(min-width:${BREAKPOINTS.xl + 1}px) and (max-width:${BREAKPOINTS.xxl}px)`,
    {
      ssr: true,
      fallback: false,
    }
  );

  const [isLargeDesktop] = useMediaQuery(
    `(min-width:${BREAKPOINTS.xxl + 1}px)`,
    {
      ssr: true,
      fallback: false,
    }
  );

  return {
    isXsMobile,
    isMobile,
    isTablet,
    isSmallLaptop,
    isLaptop,
    isDesktop,
    isLargeDesktop,
  };
};
