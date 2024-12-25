import EmblaCarousel from "@/components/EmblaCarousel";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import MobileNewsScroll from "@/components/NewsCard/MobileView";
import NewsCardMobileView from "@/components/NewsCard/MobileView";
import Search from "@/components/Search";
import MobileSkeleton from "@/components/Skeleton/Mobile";
import useAnimate from "@/hooks/useAnimate";
import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import useNews from "@/hooks/useNews";
import { NewsDataType } from "@/types/news";
import { ping, scrollAnimation } from "@/utils/keyFrames";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import Link from "next/link";
import { PiMouseScrollFill } from "react-icons/pi";

const Read = () => {
  const {
    data,
    isLoading,
    error,
    onSearch,
    onClear,
    parseInput,
    isSearchModalOpen,
    onOpenSearchModal,
    onCloseSearchModal,
    onLoadMore,
  } = useNews();
  const { animate } = useAnimate(3000);

  const { isMobile } = useDeviceSizes();

  if (error || (!data && !isLoading)) {
    return (
      <Flex
        height="full"
        width="full"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        direction="column"
        gap="2rem"
      >
        <Text
          color="red.400"
          textTransform="uppercase"
          fontSize={isMobile ? "sm" : "xl"}
          fontWeight="bold"
        >
          {error
            ? (error as { message: string }).message
            : "Something went wrong"}
        </Text>

        <Link href="/">
          <Box
            padding="1rem"
            border="1px solid"
            borderRadius="md"
            borderColor="black"
            color="black"
            _hover={{ bg: "black", color: "white", cursor: "pointer" }}
          >
            <Text textTransform="uppercase">Go to home page</Text>
          </Box>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex h="full" direction="column">
      <Header onOpenSearchModal={onOpenSearchModal} />
      {isMobile && isLoading && <MobileSkeleton />}
      {
        !isLoading && isMobile && data && (
          // data?.map((news: NewsDataType) => (
          <MobileNewsScroll
            initialData={data}
            isLoading={isLoading}
            onLoadMore={onLoadMore}
          />
        )
        // ))
      }
      <Box position="absolute" bottom="2rem" left="50%" animation={`${scrollAnimation} 1s infinite`} hidden={!animate}>
        <PiMouseScrollFill size="2rem"/>
      </Box>

      <Search
        isOpen={isSearchModalOpen}
        onClose={onCloseSearchModal}
        onSearch={onSearch}
        parseInput={parseInput}
        onClear={onClear}
      />
    </Flex>
  );

  return;

  // return (
  //   <>
  //     <Flex direction="column" gap="1rem">
  //       <Header onOpenSearchModal={onOpenSearchModal} />
  //       {error ? (
  //         <Flex
  //           height="full"
  //           width="full"
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Text>{error.message}</Text>
  //         </Flex>
  //       ) : (
  //         <Flex
  //           direction="column"
  //           justifyContent="center"
  //           alignItems="center"
  //           mt="6rem"
  //         >
  //           <EmblaCarousel>
  //             {data?.results?.map((news: NewsDataType) => (
  //               <NewsCard key={news.article_id} news={news} />
  //             ))}
  //           </EmblaCarousel>
  //           {/* <SimpleGrid
  //           columns={{ base: 1, md: 2 }}
  //           spacing="1rem"
  //           w="100%"
  //           maxW="1200px"
  //           mx="auto"
  //           px="1rem"
  //           mt="6rem"
  //         >
  //           {!error &&
  //             data?.results?.map((news: NewsDataType) => (
  //               <NewsCard
  //                 key={news.article_id}
  //                 news={news}
  //                 isLoading={isLoading}
  //               />
  //             ))}

  //           {error && error.message}
  //         </SimpleGrid> */}
  //         </Flex>
  //       )}
  //     </Flex>
  //     <Search
  //       isOpen={isSearchModalOpen}
  //       onClose={onCloseSearchModal}
  //       onSearch={onSearch}
  //       parseInput={parseInput}
  //       onClear={onClear}
  //     />
  //   </>
  // );
};

export default Read;
