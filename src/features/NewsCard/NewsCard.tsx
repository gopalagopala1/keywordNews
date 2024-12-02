import { NewsDataType } from "@/types/news";
import { Box, Card, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";

export type NewsCardType = { news: NewsDataType; isLoading: boolean };

const NewsCard = ({ news, isLoading }: NewsCardType) => {
  return (
    <Card
      w={{ base: "100%", md: "60%" }}
      h={{ base: "auto", md: "15rem" }}
      minH="15rem"
      shadow="lg"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
      as="article"
    >
      {isLoading ? (
        <Skeleton w="100%" h="100%" />
      ) : (
        <Flex padding="0.5rem" h="100%" gap={4}>
          <Box position="relative" w={{ base: "30%", md: "30%" }} minW="100px">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Flex flexDirection="column" flex={1} gap="0.5rem">
            <Heading
              size="md"
              as="a"
              href={news.source_url}
              _hover={{ color: "blue.500" }}
              cursor="pointer"
            >
              {news.title}
            </Heading>

            <Text noOfLines={3}>{news.description}</Text>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default NewsCard;
