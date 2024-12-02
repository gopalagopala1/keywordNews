import Header from "@/components/Header";
import useReadNews from "@/features/NewsCard/hooks/useReadNews";
import NewsCard from "@/features/NewsCard/NewsCard";
import { NewsDataType } from "@/types/news";
import { Flex } from "@chakra-ui/react";

const Read = () => {
  const { newsData, isNewsDataLoading, newsError } = useReadNews();

  return (
    <Flex direction="column" gap="1rem">
      <Header />
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
        {newsData?.results.map((news: NewsDataType) => (
          <NewsCard
            key={news.article_id}
            news={news}
            isLoading={isNewsDataLoading}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Read;
