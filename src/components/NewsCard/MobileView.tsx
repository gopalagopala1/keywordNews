import { NewsDataType } from "@/types/news";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import MobileSkeleton from "../Skeleton/Mobile";

type NewsCardMobileViewType = { 
  news: NewsDataType; 
  isLoading: boolean;
  currentIndex: number;
};

const NewsCardMobileView = ({ news, isLoading, currentIndex }: NewsCardMobileViewType) => {
  const [noOfLines, setNoOfLines] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setNoOfLines(window.innerHeight < 700 ? 4 : 10);
    };
    
    
    handleResize();

    
    window.addEventListener('resize', handleResize);
    
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const navigateToNews = async (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    
    sessionStorage.setItem('lastNewsIndex', currentIndex.toString());
    
    
    window.location.href = news.link;
  }

  const mobileCard = () => (
    <Flex 
      h="full" 
      direction="column" 
      width="full" 
      gap="1rem" 
      mt="5rem"
      onClick={(e) => navigateToNews(e)}
    >
      <Box h="50%" w="100%" position="relative">
        <Image
          src={news.image_url}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt={news.title}
          priority
        />
      </Box>
      <Text fontSize="1.25rem" fontWeight="bold">
        {news.title}
      </Text>
      <Text noOfLines={noOfLines}>{news.description}</Text>
    </Flex>
  );

  return <>{isLoading ? <MobileSkeleton /> : mobileCard()}</>;
};

const MobileNewsScroll = ({
  initialData,
  isLoading,
  onLoadMore,
}: {
  initialData: NewsDataType[];
  isLoading: boolean;
  onLoadMore: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check for stored index when component mounts
    const storedIndex = sessionStorage.getItem('lastNewsIndex');
    if (storedIndex) {
      const index = parseInt(storedIndex);
      if (index >= 0 && index < initialData.length) {
        setCurrentIndex(index);
        // Clear the stored index after restoring
        sessionStorage.removeItem('lastNewsIndex');
      }
    }
  }, [initialData.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;

    // If touchEnd is 0, it's a click event, so don't handle swipe
    if (touchEnd === 0) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swipe up - go to next news
      if (currentIndex < initialData.length - 1) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      } else if (currentIndex === initialData.length - 1) {
        onLoadMore();
      }
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe down - go to previous news
      if (currentIndex > 0) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
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
          currentIndex={currentIndex}
        />
      </Box>
    </Box>
  );
};

export default MobileNewsScroll;