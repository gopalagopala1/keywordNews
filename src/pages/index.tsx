import Header from "@/components/Header";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header isHomePage={true} />
      <Flex
        gap="0.5rem"
        width="full"
        height="full"
        justifyContent="center"
        alignItems="center"
      >
        <Flex width="50%" height="full">
          <Box height="full" width="full" position="relative">
            <Image
              src="/hero2.webp"
              alt="Keyword News"
              objectFit="contain"
              fill
            />
          </Box>
        </Flex>

        <Flex width="50%" direction="column" gap="2rem">
         
            <Text fontSize="3rem" color="purple" fontWeight="thin">
              Stay Informed. Filter News
            </Text>

            <Text fontSize="1rem" fontWeight="light">
              Stay informed in 60 words. We understand you don’t have time to go
              through long news articles everyday. So we cut the clutter and
              deliver them, in 60-word shorts. Short news for the mobile
              generation.
            </Text>
          
        </Flex>
      </Flex>
    </>
  );
}
