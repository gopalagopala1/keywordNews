import Header from "@/components/Header";
import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { rotateAnimation } from "@/utils/keyFrames";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SlKey } from "react-icons/sl";

export default function Home() {
  const [height, setHeight] = useState("62vh")
  
   useEffect(() => {
      const handleResize = () => {
        setHeight(window.innerHeight < 700 ? "70vh" : "62vh");
      };
  
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const {isMobile} = useDeviceSizes();

  const heroText = () => (
    <Box
      bg="red.500"
      width="full"
      minHeight={isMobile ? height : "77vh"}
      position="relative"
    >
      <Text
        fontSize={isMobile ? "2.5rem" : "3.5rem"}
        color="white"
        mt="8rem"
        textAlign="center"
        textTransform="uppercase"
        fontWeight="bold"
      >
        Stay Informed,
        <br /> Keyword Way,
        <br />{" "}
        <Text as="span" color="#FEBE10" fontSize={isMobile ? "3rem" : "6rem"}>
          Happy Way
        </Text>
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
          With Keyword News, discover news tailored to your interests. Search
          for news by including the topics you care about—or{" "}
          <strong>exclude</strong> keywords to filter out what you don&#39;t.
          You can also search specifically for{" "}
          <strong style={{ color: "#FEBE10"  }}>
            positive and constructive
          </strong>{" "}
          news. It&#39;s news, customized to you.
        </Text>
      </Flex>
    </Flex>
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
