import { useState } from "react";
import { useFetchNews } from "../../api/fetch-news";

const useReadNews = () => {
  const [searchParams, setSearchParams] = useState();

  // fetching news
  const {
    data: newsData,
    isLoading: isNewsDataLoading,
    error: newsError,
  } = useFetchNews({});

  return {
    newsData,
    isNewsDataLoading,
    newsError,
  };
};

export default useReadNews;
