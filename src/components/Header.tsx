import useAnimate from "@/hooks/useAnimate";
import { ping } from "@/utils/keyFrames";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsFilterSquareFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";

type HeaderProps = {
  isHomePage?: boolean;
  onOpenSearchModal?: () => void;
};

const Header = ({ isHomePage, onOpenSearchModal }: HeaderProps) => {
  const { animate } = useAnimate();

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
          <Box animation={animate ? `${ping} 1s infinite` : ""}>
            <Link href="/read">
              <FaBookReader color="black" size="1.5rem" />
            </Link>
          </Box>
        ) : (
          <Box
            onClick={onOpenSearchModal}
          >
            <BsFilterSquareFill color="black" size="1.5rem" />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
