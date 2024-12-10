import { useState } from "react";
import { useFetchNews } from "../../api/fetch-news";
import { FetchNewsPayload } from "@/types/news";

const useReadNews = () => {
  const [searchParams, setSearchParams] = useState<FetchNewsPayload>({});

  const {
    data: newsData,
    isLoading: isNewsDataLoading,
    error: newsError,
  } = useFetchNews(searchParams);

  const parseInput = (inputString: string) => {
    if (!inputString?.trim()) {
      return [];
    }

    // Split by comma first, then by space, and flatten the result
    return inputString
      .split(",")
      .flatMap((item) => item.trim().split(" "))
      .filter((item) => item.length > 0)
      .map((item) => item.toLowerCase());
  };

  const onSearch = (payload: FetchNewsPayload) => {
    setSearchParams({ ...payload });
  };

  const onClear = () => {
    setSearchParams({});
  };

  return {
    newsData,
    isNewsDataLoading,
    newsError,
    parseInput,
    onSearch,
    onClear,
  };
};

export default useReadNews;
