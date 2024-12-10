import Header from "@/components/Header";
import useReadNews from "@/features/NewsCard/hooks/useReadNews";
import NewsCard from "@/features/NewsCard/NewsCard";
import Search from "@/features/Search/Search";
import { NewsDataType } from "@/types/news";
import { Flex, useDisclosure } from "@chakra-ui/react";

const Read = () => {
  const {
    newsData,
    isNewsDataLoading,
    newsError,
    onSearch,
    onClear,
    parseInput,
  } = useReadNews();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="column" gap="1rem">
        <Header onOpenSearchModal={onOpen} />
        <Flex
          justify="center"
          align="center"
          w="100%"
          gap="1rem"
          direction="column"
          overflow="auto"
          overflowY="scroll"
          mt="6rem"
        >
          {newsData &&
            newsData?.results &&
            newsData?.results?.map((news: NewsDataType) => (
              <NewsCard
                key={news.article_id}
                news={news}
                isLoading={isNewsDataLoading}
              />
            ))}
        </Flex>
      </Flex>
      <Search
        isOpen={isOpen}
        onClose={onClose}
        onSearch={onSearch}
        parseInput={parseInput}
        onClear={onClear}
      />
    </>
  );
};

export default Read;
