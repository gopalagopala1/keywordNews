import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import Search from "@/components/Search";
import useNews from "@/hooks/useNews";
import { NewsDataType } from "@/types/news";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

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

  return (
    <>
      <Flex direction="column" gap="1rem">
        <Header onOpenSearchModal={onOpenSearchModal} />
        <Flex direction="column" justifyContent="center" alignItems="center">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing="1rem"
            w="100%"
            maxW="1200px"
            mx="auto"
            px="1rem"
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

            {error && error.message}
          </SimpleGrid>
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
