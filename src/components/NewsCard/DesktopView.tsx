import { NewsDataType } from "@/types/news";
import { slideInAnimation } from "@/utils/keyFrames";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import  DesktopSkeleton  from "../Skeleton/Desktop";


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

const NewsCard = ({
  news,
  currentIndex,
  isLoading,
}: {
  news: NewsDataType;
  currentIndex: number;
  isLoading: boolean;
}) => {
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
  

  if (isLoading){
    return (<DesktopSkeleton/>)
  }

  return (
    <Flex h="full" direction="column" width="full" gap="1rem">
      <Box h="60%" w="100%" position="relative">
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
      <Text fontSize="1.5rem" fontWeight="bold">
        {news?.title}
      </Text>
      <Text noOfLines={noOfLines}>{news?.description}</Text>
    </Flex>
  );
};

const DesktopView = ({
  data,
  isLoading,
  currentIndex,
  setCurrentIndex,
  onLoadMore
}: {
  data: NewsDataType[] | undefined;
  isLoading: boolean;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onLoadMore: () => void;
}) => {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.querySelector(".carousel-container")?.clientWidth || 0;
      const availableWidth = containerWidth - 128; // 8rem padding
      const gapWidth = 32 * (cardsPerView - 1); // 2rem gap
      const width = (availableWidth - gapWidth) / cardsPerView;
      setCardWidth(width);

      if (window.innerWidth < 1200) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardsPerView]);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    if (!data) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex + cardsPerView >= data.length) {
      onLoadMore();
    }
    setCurrentIndex(Math.min(data.length - cardsPerView, nextIndex));
  };

  if (!data) return null;

  return (
    <Box position="relative" h="100%" w="100%" overflow="hidden">
      <Flex
        position="absolute"
        top="50%"
        left="2rem"
        transform="translateY(-50%)"
        zIndex={10}
      >
        <IconButton
          aria-label="Previous"
          icon={<FaCaretSquareLeft />}
          onClick={handlePrevious}
          isDisabled={currentIndex === 0}
          size="lg"
          bg="black"
          color="white"
        />
      </Flex>

      <Flex
        position="absolute"
        top="50%"
        right="2rem"
        transform="translateY(-50%)"
        zIndex={10}
      >
        <IconButton
          aria-label="Next"
          icon={<FaCaretSquareRight />}
          onClick={handleNext}
          isDisabled={currentIndex >= data.length - cardsPerView}
          size="lg"
          bg="black"
          color="white"
        />
      </Flex>

      <Flex 
        className="carousel-container"
        position="relative" 
        px="4rem" 
        height="100%" 
        overflow="hidden"
      >
        <Flex
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + 32)}px)`,
            transition: "transform 0.5s ease-in-out",
            display: "flex",
            gap: "2rem",
          }}
        >
          {data.map((news, index) => (
            <Box
              key={index}
              style={{
                width: `${cardWidth}px`,
                flex: "0 0 auto",
              }}
              height="100%"
              py="4rem"
              opacity={
                index >= currentIndex && index < currentIndex + cardsPerView
                  ? 1
                  : 0.3
              }
              transition="opacity 0.5s ease-in-out"
            >
              <NewsCard news={news} currentIndex={index} isLoading={isLoading} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default DesktopView;