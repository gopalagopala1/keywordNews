import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { TbAdjustmentsSearch } from "react-icons/tb";

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
      bg="white"
      zIndex="1000"
      top="0"
      left="0"
      w="full"
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
            <Image
              src="/logo_1.png"
              alt="Keyword News"
              width={40}
              height={40}
            />

            <Text
              fontSize="1.5rem"
              fontWeight="extrabold"
              textTransform="uppercase"
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
            <Text fontSize="1rem" color="purple">
              Read
            </Text>
          </Link>
        ) : (
          <Box onClick={onOpenSearchModal}>
            <TbAdjustmentsSearch size="2rem" color="purple" />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
