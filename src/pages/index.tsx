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
        <Flex width="80%" textAlign="center" direction="column" gap="2rem">
          <Text
            fontSize="3rem"
            color="purple.700"
            fontWeight="thin"
            textTransform="capitalize"
          >
            Stay informed, keyword way
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
