import { NewsDataType } from "@/types/news";
import { Box, Flex, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import MobileSkeleton from "../Skeleton/Mobile";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const MobileNewsScroll = ({ 
  initialData, 
  isLoading,
  onLoadMore 
}: { 
  initialData: NewsDataType[];
  isLoading: boolean;
  onLoadMore: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swipe up - go to next news
      if (currentIndex < initialData.length - 1) {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
      } else if (currentIndex === initialData.length - 1) {
        onLoadMore();
      }
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe down - go to previous news
      if (currentIndex > 0) {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    // Reset transition state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <Box h="100vh" w="full" overflow="hidden" position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <NewsCardMobileView
          news={initialData[currentIndex]}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default MobileNewsScroll;