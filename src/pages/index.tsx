import Header from "@/components/Header";
import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  const { isMobile } = useDeviceSizes();

  const heroText = () => (
    <Box bg="red.400" width="full" height="62vh" position="relative">
      <Text
        fontSize={isMobile ? "2.5rem" : "3rem"}
        color="white"
        mt="8rem"
        textAlign="center"
        textTransform="uppercase"
        fontWeight="bold"
      >
        Stay Informed,
        <br /> Keyword Way
      </Text>
    </Box>
  );

  return (
    <Flex direction="column" width="full" height="full" position="relative">
      <Header isHomePage={true} />
      {heroText()}

      <Flex textAlign="center" direction="column" mt="2rem">
        <Text fontSize="1.25rem"  textAlign="start">
          With Keyword News, discover news tailored to your interests. Search
          for news by including the topics you care about—or{" "}
          <strong>exclude</strong> keywords to filter out what you don’t.
          It&apos;s news, customized to you.
        </Text>
      </Flex>
    </Flex>
  );
}
