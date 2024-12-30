import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ErrorPage () {

    const {isMobile} = useDeviceSizes();

    return (
        <Flex
          height="full"
          width="full"
          justifyContent="center"
          alignItems="center"
          mx="auto"
          direction="column"
          gap="2rem"
        >
          <Text
            color="red.400"
            textTransform="uppercase"
            fontSize={isMobile ? "sm" : "xl"}
            fontWeight="bold"
          >
             Something went wrong
          </Text>
  
          <Link href="/">
            <Box
              padding="1rem"
              border="1px solid"
              borderRadius="md"
              borderColor="black"
              color="black"
              _hover={{ bg: "black", color: "white", cursor: "pointer" }}
            >
              <Text textTransform="uppercase">Go to home page</Text>
            </Box>
          </Link>
        </Flex>
      );
}