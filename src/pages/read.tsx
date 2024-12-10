import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import Search from "@/components/Search";
import useNews from "@/hooks/useNews";
import { NewsDataType } from "@/types/news";
import { Flex } from "@chakra-ui/react";

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
  } = useNews();

  console.log("error: ", error);

  return (
    <>
      <Flex direction="column" gap="1rem">
        <Header onOpenSearchModal={onOpenSearchModal} />
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
          {!error &&
            data?.results?.map((news: NewsDataType) => (
              <NewsCard
                key={news.article_id}
                news={news}
                isLoading={isLoading}
              />
            ))}
        </Flex>
      </Flex>
      <Search
        isOpen={isSearchModalOpen}
        onClose={onCloseSearchModal}
        onSearch={onSearch}
        parseInput={parseInput}
        onClear={onClear}
      />
    </>
  );
};

export default Read;
