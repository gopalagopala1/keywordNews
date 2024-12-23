import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { NewsDataType } from "@/types/news";
import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export type NewsCardType = { news: NewsDataType };

const NewsCard = ({ news }: NewsCardType) => {
  const { isMobile } = useDeviceSizes();
  const mobileView = () => (
    <Flex  h="full" gap={4} direction="column" minH="full">
      <Box position="relative" w="100%" height="300px" minH="">
        <Image
          src={news.image_url}
          alt={news.title}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </Box>  
      <Flex flexDirection="column" flex={1} gap="0.5rem" h="full">
        <Heading
          size="md"
          as="a"
          href={news.link}
          _hover={{ color: "blue.500" }}
          cursor="pointer"
        >
          {news.title}
        </Heading>

        <Text>{news.description}</Text>
      </Flex>
    </Flex>
  );

  const desktopView = () => (
    <Card
      w="100%"
      h="50%"
      minH="70%"
      shadow="lg"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
      as="article"
    >
      <Flex padding="2rem" h="full" gap={4} direction="column" minH="full">
        <Box position="relative" w="100%" height="500px" minH="">
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </Box>
        <Flex flexDirection="column" flex={1} gap="0.5rem">
          <Heading
            size="md"
            as="a"
            href={news.link}
            _hover={{ color: "blue.500" }}
            cursor="pointer"
          >
            {news.title}
          </Heading>

          <Text>{news.description}</Text>
        </Flex>
      </Flex>
    </Card>
  );

  return isMobile ? mobileView() : desktopView();
};

export default NewsCard;
