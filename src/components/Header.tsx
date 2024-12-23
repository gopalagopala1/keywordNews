import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";


type HeaderProps = {
  isHomePage?: boolean;
  onOpenSearchModal?: () => void;
};

const Header = ({ isHomePage, onOpenSearchModal }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        {/* <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button> */}
        {isHomePage ? (
          <Link href="/read">
           <FaBookReader color="black" size="1.5rem"/>
          </Link>
        ) : (
          <Box onClick={onOpenSearchModal}>
            <IoNewspaperSharp color="black" size="1.5rem"/>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
