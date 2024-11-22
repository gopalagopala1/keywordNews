import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  isHomePage: boolean;
};

const Header = ({ isHomePage }: HeaderProps) => {
  return (
    <Box h="5rem" boxShadow={isHomePage ? "none" : "lg"} gap="0.1rem">
      <Flex justify="space-between" align="center" h="100%">
        <Flex align="center" gap="0.1rem" h="100%" justify="start">
          <Image src="/logo_1.png" alt="Keyword News" width={40} height={40} />

          <Text
            fontSize="1.5rem"
            fontWeight="extrabold"
            textTransform="uppercase"
          >
            Keyword News
          </Text>
        </Flex>

        {isHomePage && (
          <Link href="/">
            <Text
              fontSize="1rem"
              fontWeight="light"
              textDecorationLine="underline"
              textUnderlineOffset="0.25rem"
            >
              Read
            </Text>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
