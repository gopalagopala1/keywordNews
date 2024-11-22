import Header from "@/components/Header";
import { Flex, Text } from "@chakra-ui/react";
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
        <Flex width="50%">
          <Image
            src="/logo_1.png"
            alt="Keyword News"
            width="100"
            height="100"
          />
        </Flex>

        <Flex width="50%">
          <Text>
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
