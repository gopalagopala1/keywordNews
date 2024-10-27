import { Button, Flex, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Flex justify="center" align="center" h="5rem" shadow="lg">
        <Text fontSize="1.5rem" fontWeight="bold" fontStyle="italic">
          Keyword News
        </Text>
      </Flex>

      <Flex>
        <Button>Button</Button>
      </Flex>
    </>
  );
}
