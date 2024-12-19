import BaseLayout from "@/layouts/BaseLayout";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { News_Cycle } from "next/font/google";

const queryClient = new QueryClient();

const newsCycle = News_Cycle({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BaseLayout>
          <Component {...pageProps} className={newsCycle.className} />
        </BaseLayout>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
