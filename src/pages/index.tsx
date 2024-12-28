import Header from "@/components/Header";
import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { rotateAnimation } from "@/utils/keyFrames";
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
        <br /> Keyword Way,
        <br /> <Text as="span" color="#FEBE10" fontSize="3rem">Happy Way</Text>
      </Text>

      <AnimatedKey />
    </Box>
  );

  return (
    <Flex direction="column" width="full" height="full" position="relative">
      <Header isHomePage={true} />
      {heroText()}

      <Flex textAlign="center" direction="column" mt="2rem">
        <Text fontSize={isMobile ? "1.25rem" : "2rem"} textAlign="start">
        With Keyword News, discover news tailored to your interests. Search for news by including the topics you care about—or <strong>exclude</strong> keywords to filter out what you don&#39;t. You can also search specifically for <strong>positive and constructive</strong> news. It&#39;s news, customized to you.
        </Text>
      </Flex>
    </Flex>
    // under maintenance
    // <Flex
    //   direction="column"
    //   width="full"
    //   height="full"
    //   position="relative"
    //   justifyContent="center"
    //   alignItems="center" 

    // >
  
    //   <Text
    //     fontSize={isMobile ? "1.25rem" : "2rem"}
    //     textAlign="center"
    //     mt="2rem"
    //     color="red.500"
    //     fontWeight="extrabold"
    //   >
    //     We are currently under maintenance. Please check back later.
    //   </Text>
    // </Flex>
  );
}

const AnimatedKey = () => {
  const { isMobile } = useDeviceSizes();

  const animation = `${rotateAnimation} 4s ease-in-out forwards`;

  return (
    <Flex
      width="full"
      alignItems="center"
      mx="auto"
      justifyContent="center"
      mt="2rem"
    >
      <Box animation={animation} display="flex">
        <SlKey
          size={isMobile ? "5rem" : "8.5rem"}
          color="white"
          fontWeight="bold"
        />
      </Box>
    </Flex>
  );
};
