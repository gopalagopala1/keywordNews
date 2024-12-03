import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { TbVirusSearch } from "react-icons/tb";


type HeaderProps = {
  isHomePage?: boolean;
};

const Header = ({ isHomePage }: HeaderProps) => {
  return (
    <Flex h="5rem" gap="0.1rem" position="fixed">
      <Flex justify="space-between" align="center" h="100%" w="full">
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
        <TbVirusSearch size="40px" color="purple"/>
        {/* {isHomePage && (
          <Link href="/read">
            <Text
              fontSize="1rem"
              fontWeight="light"
              textDecorationLine="underline"
              textUnderlineOffset="0.25rem"
            >
              Read
            </Text>
          </Link>
        )} */}
      </Flex>
    </Flex>
  );
};

export default Header;
