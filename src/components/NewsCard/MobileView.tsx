import { NewsDataType } from "@/types/news";
import { Box, Flex, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import MobileSkeleton from "../Skeleton/Mobile";
import Image from "next/image";

type NewsCardMobileViewType = { news: NewsDataType; isLoading: boolean };

const NewsCardMobileView = ({ news, isLoading }: NewsCardMobileViewType) => {
  const mobileCard = () => (
    <Flex h="full" direction="column" width="full" gap="1rem" mt="5rem">
      
      <Box h="50%" w="100%" position="relative">
        <Image
          src={news.image_url}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt={news.title}
        />
      </Box>
      <Text fontSize="1.25rem" fontWeight="bold">{news.title}</Text>
      <Text noOfLines={3}>{news.description}</Text>

    </Flex>
  );

  return (
   <>
      {isLoading ? <MobileSkeleton /> : mobileCard()}
      </>
  );
};

export default NewsCardMobileView;
