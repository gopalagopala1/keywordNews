import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
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
      borderColor="purple.700"
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
            <Text
              fontSize="1.5rem"
              fontWeight="extrabold"
              textTransform="uppercase"
              color="purple.700"
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
            <Text fontSize="1rem" color="purple.700">
              Read
            </Text>
          </Link>
        ) : (
          <Box onClick={onOpenSearchModal}>
            <TbAdjustmentsSearch size="2rem" color="#553C9A" />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
