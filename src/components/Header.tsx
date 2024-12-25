import { Box, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FaBookReader } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";


type HeaderProps = {
  isHomePage?: boolean;
  onOpenSearchModal?: () => void;
};

const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(1.25);
    opacity: 0;
  }
`;





const Header = ({ isHomePage, onOpenSearchModal }: HeaderProps) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 3000); // Stop animation after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex
      h="5rem"
      gap="0.1rem"
      position="fixed"
      borderBottom="1px"
      borderColor="black"
      bg="white"
      zIndex="1000"
      top="0"
      left="0"
      w="full"
      padding="1rem"
    >
      <Flex
        justify="space-between"
        align="center"
        h="100%"
        w="container.xl"
        mx="auto"
      >
        <Link href="/">
          <Flex align="center" gap="0.1rem" h="100%" justify="start">
            <Text
              fontSize="1.25rem"
              fontWeight="extrabold"
              textTransform="uppercase"
              color="black"
            >
              Keyword News
            </Text>
          </Flex>
        </Link>
        {isHomePage ? (
          <Box animation={animate ? `${ping} 1s infinite` : ''}>
          <Link href="/read" >
            
              <FaBookReader color="black" size="1.5rem"/>
            
          </Link>
          </Box>
        ) : (
          <Box onClick={onOpenSearchModal} animation={animate ? `${ping} 1s infinite` : ''}>
            <IoNewspaperSharp color="black" size="1.5rem"/>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
