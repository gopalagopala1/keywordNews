import Header from "@/components/Header";
import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { Box, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import { SlKey } from "react-icons/sl";

export default function Home() {
  const { isMobile } = useDeviceSizes();

  const heroText = () => (
    <Box bg="red.500" width="full" height="62vh" position="relative">
      <Text
        fontSize={isMobile ? "2.5rem" : "4rem"}
        color="white"
        mt="8rem"
        textAlign="center"
        textTransform="uppercase"
        fontWeight="bold"
      >
        Stay Informed,
        <br /> Keyword Way
      </Text>

      <AnimatedKey/>
    </Box>
  );

  return (
    <Flex direction="column" width="full" height="full" position="relative">
      <Header isHomePage={true} />
      {heroText()}

      <Flex textAlign="center" direction="column" mt="2rem">
        <Text fontSize={isMobile ? "1.25rem" : "2rem"} textAlign="start">
          With Keyword News, discover news tailored to your interests. Search
          for news by including the topics you care about—or{" "}
          <strong>exclude</strong> keywords to filter out what you don’t.
          It&apos;s news, customized to you.
        </Text>
      </Flex>
    </Flex>
  );
}

const AnimatedKey = () => {

  const {isMobile} = useDeviceSizes();

  const rotateAnimation = keyframes`
  from {
    transform: rotate(50deg);
  }
  to {
    transform: rotate(-90deg);
  }
`;

  const animation = `${rotateAnimation} 2s ease-in-out forwards`;

  return (
    <Flex width="full" alignItems="center" mx="auto" justifyContent="center" mt="2rem">
      <Box animation={animation} display="flex">
        <SlKey size={isMobile? "5rem": "8.5rem"} color="white" />
      </Box>
    </Flex>
  );
};
