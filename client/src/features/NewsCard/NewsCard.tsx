import { NewsCardProps } from "@/types/news";
import {
  Box,
  Card,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";
import Image from "next/image";

const NewsCard = ({
  title,
  description,
  url,
  image,
  isLoading,
}: NewsCardProps) => {
  return (
    <Card
      w={{ base: "100%", md: "60%" }}
      h={{ base: "auto", md: "15rem" }}
      shadow="lg"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
      as="article"
    >
      <Flex padding="0.5rem" h="100%" gap={4}>
        <Box position="relative" w={{ base: "30%", md: "30%" }} minW="100px">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
        <Flex flexDirection="column" flex={1} gap="0.5rem">
          <Heading
            size="md"
            as="a"
            href={url}
            _hover={{ color: "blue.500" }}
            cursor="pointer"
          >
            {title}
          </Heading>

          <Text noOfLines={3}>{description}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default NewsCard;
