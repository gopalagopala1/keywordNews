import { FetchNewsPayload, NewsDataType } from "@/types/news";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetchNews } from "./useFetchNews";
import _ from "lodash";

const useNews = () => {
  const [searchParams, setSearchParams] = useState<FetchNewsPayload>({});
  const [nextPage, setNextPage] = useState<number>();
  const [isHappy, setHappy] = useState(false);
  const [newsData, setNewsData] = useState<NewsDataType[]>();
  const [happyNewsData, setHappyNewsData] = useState<NewsDataType[]>();
  const [showDisplayMessage, setShowDisplayMessage] = useState<boolean>(true);
  const [initialIndex, setInitialIndex] = useState<number>(0);
  const { response, isLoading } = useFetchNews(searchParams);
  const displayMessage = response?.errorMessage || "";
  const error =
    response?.status == "error"
      ? response?.data
      : (undefined as { message: string } | undefined);

  const parseInput = (input: string) => {
    // handle empty string
    if (!input?.trim()) {
      return [];
    }

    // Split by comma first, then by space, and flatten the result
    return input
      .split(",")
      .flatMap((item) => item.trim().split(" "))
      .filter((item) => item.length > 0)
      .map((item) => item.toLowerCase());
  };

  useEffect(() => {
    
    if (response && response.data && response?.status !== "error") {
      if (!response.errorMessage) {
        const updatedData = _.uniqBy(
          [...(newsData ?? []), ...response?.data],
          "article_id"
        );
        const initialIndex = newsData?.length as number;
        setInitialIndex(initialIndex);
        setNewsData(updatedData);
      } else if (!response.errorMessage) {
        setInitialIndex(0);
        if (isHappy) {
          setHappyNewsData([...response?.data]);
        } else {
          setNewsData([...response?.data]);
        }
      }
    } else if (
      response &&
      response.data &&
      response.errorMessage &&
      response?.status !== "error"
    ) {
    }
  }, [response, isHappy]);

  const onSearch = (payload: FetchNewsPayload) => {
    setHappy(false);
    setShowDisplayMessage(true);
    setSearchParams({ ...payload, isHappy: false });
  };

  useEffect(() => {
    if (response?.nextPage) {
      setNextPage(response.nextPage);
    }
  }, [response?.nextPage]);

  const onLoadMore = () => {
    setSearchParams({ ...searchParams, page: nextPage });
  };

  const onClear = () => {
    setSearchParams({});
  };

  const {
    isOpen: isSearchModalOpen,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

  const onClickHappy = (isHappy: boolean) => {
    setHappy(isHappy);
    setSearchParams({ ...searchParams, isHappy });
  };

  return {
    data: isHappy ? happyNewsData :  newsData ?? response?.data,
    isLoading,
    error,
    isHappy,
    isSearchModalOpen,
    displayMessage,
    showDisplayMessage,
    initialIndex,
    setShowDisplayMessage,
    parseInput,
    onSearch,
    onClear,
    onOpenSearchModal,
    onCloseSearchModal,
    onLoadMore,
    onClickHappy,
  };
};

export default useNews;
