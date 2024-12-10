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
          <Text
            fontSize="3rem"
            color="purple"
            fontWeight="thin"
            textTransform="capitalize"
          >
            Stay informed, your way
          </Text>

          <Text fontSize="1rem" fontWeight="light">
            With Keyword News, discover news tailored to your interests. Search
            for news by including the topics you care about—or{" "}
            <strong>exclude</strong> keywords to filter out what you don’t.
            It&apos;s news, customized to you.
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
