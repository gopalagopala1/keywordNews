import Header from "@/components/Header";
import MobileNewsScroll from "@/components/NewsCard/MobileView";
import Search from "@/components/Search";
import MobileSkeleton from "@/components/Skeleton/Mobile";
import useAnimate from "@/hooks/useAnimate";
import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import useNews from "@/hooks/useNews";
import { scrollLeftAnimation, scrollRightAnimation } from "@/utils/keyFrames";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa6";

import Link from "next/link";

const Read = () => {
  const {
    data,
    isLoading,
    error,
    isSearchModalOpen,
    isHappy,
    displayMessage,
    showDisplayMessage,
    initialIndex,
    setShowDisplayMessage,
    onSearch,
    onClear,
    parseInput,
    onOpenSearchModal,
    onCloseSearchModal,
    onLoadMore,
    onClickHappy,
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
    <Flex h="100dvh" direction="column">
      <Header
        onOpenSearchModal={onOpenSearchModal}
        isHappy={isHappy}
        onClickHappy={onClickHappy}
      />
      {displayMessage && showDisplayMessage && (
        <Box
          bg="red.500"
          position="fixed"
          zIndex="5"
          width="full"
          top="5rem"
          ml="-1rem"
          textAlign="center"
          pt="0.5rem"
        >
          <Text color="white" fontSize="0.75rem" fontWeight="bold">
            {displayMessage}
          </Text>
          <Box
            bg="black"
            mt="0.4rem"
            borderBottom="1px solid"
            fontSize="0.8rem"
            onClick={() => setShowDisplayMessage(!showDisplayMessage)}
          >
            {" "}
            <Text color="white">Close</Text>
          </Box>
        </Box>
      )}
      {isMobile && isLoading && <MobileSkeleton />}
      {!isLoading && isMobile && data && (
        <MobileNewsScroll
          initialData={data}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          initialIndex={initialIndex}
        />
      )}
      <Flex gap="1rem" bottom="10%" position="absolute" left="38%">
        <Box
          animation={`${scrollLeftAnimation} 1s infinite`}
          hidden={!animate}
          zIndex={2}
        >
          <FaHandPointLeft size="3rem" color="#84ACFA" />
        </Box>
        <Box
          animation={`${scrollRightAnimation} 1s infinite`}
          hidden={!animate}
          zIndex={2}
        >
          <FaHandPointRight size="3rem" color="#84ACFA" />
        </Box>
      </Flex>
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
