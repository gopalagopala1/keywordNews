import NewsCard from "@/features/NewsCard/NewsCard";
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <Flex flexDirection="column" gap="1rem">
      <Flex justify="center" align="center" h="5rem" shadow="lg" gap="0.1rem">
        <Image src="/logo.webp" alt="Keyword News" width={50} height={50} />
        <Text fontSize="1.5rem" fontWeight="bold" fontStyle="italic">
          Keyword News
        </Text>
      </Flex>

      <Flex justify="center" align="center" w="100%" gap="1rem" direction='column'>
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={true}
        />
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={true}
        />{" "}
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={true}
        />{" "}
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={true}
        />
      </Flex>
    </Flex>
  );
}
