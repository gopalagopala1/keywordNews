import { NewsDataType } from "@/types/news";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import MobileSkeleton from "../Skeleton/Mobile";
import { slideInAnimation } from "@/utils/keyFrames";

const ReadMore = () => {
  return (
    <Flex
      w="100%"
      h="1rem"
      justify="center"
      align="center"
      position="relative"
      fontSize="0.8rem"
      fontWeight="extrabold"
      padding="1rem"
      color="white"
    >
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="gray"
        opacity={0.5}
        zIndex={-1}
      />
      Read More
    </Flex>
  );
};

type NewsCardMobileViewType = {
  news: NewsDataType;
  isLoading: boolean;
  currentIndex: number;
};

const NewsCardMobileView = ({
  news,
  isLoading,
  currentIndex,
}: NewsCardMobileViewType) => {
  const [noOfLines, setNoOfLines] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setNoOfLines(window.innerHeight < 700 ? 4 : 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateToNews = async (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    sessionStorage.setItem("lastNewsIndex", currentIndex.toString());
    window.open(news.link, "_blank");
  };

  const mobileCard = () => (
    <Flex h="full" direction="column" width="full" gap="1rem" mt="5rem">
      <Box h="50%" w="100%" position="relative">
        <Image
          loading="lazy"
          src={news?.image_url}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt={news?.title}
        />

        <Box
          position="absolute"
          bottom="4%"
          zIndex={2}
          animation={`${slideInAnimation} 5s`}
          width="100%"
          onClick={(e) => navigateToNews(e)}
        >
          <ReadMore />
        </Box>
      </Box>
      <Text fontSize="1.25rem" fontWeight="bold">
        {news?.title}
      </Text>
      <Text noOfLines={noOfLines}>{news?.description}</Text>
    </Flex>
  );

  return <>{isLoading ? <MobileSkeleton /> : mobileCard()}</>;
};

const MobileNewsScroll = ({
  data,
  isLoading,
  currentIndex,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  getDragOffset,
  isDragging,
}: {
  data: NewsDataType[] | undefined;
  isLoading: boolean;
  currentIndex: number;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  getDragOffset: () => number;
  isDragging: boolean;
}) => {
  console.log('current index: ', currentIndex)
  return (
    <Box h="100vh" w="100vw" overflow="hidden" position="relative">
      <Flex
        position="relative"
        direction="row"
        width="100%"
        height="100%"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Flex
          position="absolute"
          top="0"
          left={`calc(${-100 * currentIndex}% + ${getDragOffset()}px)`}
          height="100%"
          style={{
            transition: isDragging
              ? "none"
              : "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "left",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          {data?.map((news, index) => (
            <Box
              key={index}
              width="calc(100vw - 1rem)"
              height="100%"
              flexShrink={0}
              opacity={index === currentIndex ? 1 : 0.7}
            >
              <NewsCardMobileView
                news={news}
                isLoading={isLoading}
                currentIndex={index}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileNewsScroll;
