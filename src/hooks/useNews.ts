import { FetchNewsPayload, NewsDataType } from "@/types/news";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetchNews } from "./useFetchNews";
import _ from "lodash";

const useNews = () => {
  const [newsData, setNewsData] = useState<NewsDataType[]>();
  
  const [happyNewsData, setHappyNewsData] = useState<NewsDataType[]>();
  const [isHappy, setHappy] = useState(false);
  
  const [searchParams, setSearchParams] = useState<FetchNewsPayload>({});
  const [nextPage, setNextPage] = useState<number>();
  
  const [showDisplayMessage, setShowDisplayMessage] = useState<boolean>(true);
  const [initialIndex, setInitialIndex] = useState<number>(0);
  
  const { response, isLoading } = useFetchNews(searchParams);
  const displayMessage = response?.errorMessage || "";
  const error =
    response?.status == "error"
      ? response?.data
      : (undefined as { message: string } | undefined);



  useEffect(() => {
    if (response && response.data && response?.status !== "error") {
      if (isHappy) {
        setInitialIndex(0);
        setHappyNewsData([...response?.data]);
      } else if (!response.errorMessage) {
        const newData = response?.data ?? [];
        const updatedData = _.uniqBy(
          [...(newsData ?? []), ...newData],
          "article_id"
        );
        setNewsData(updatedData);
        
        // If this is new content being loaded, set index to start of new content
        if (searchParams.page && searchParams.page > 1) {
          const existingDataLength = newsData?.length ?? 0;
          setInitialIndex(existingDataLength);
        }
      } else if (response.errorMessage) {
        setInitialIndex(0);
        setNewsData([...response?.data]);
      }
    }
  }, [response, isHappy]);
  
  const onSearch = (payload: FetchNewsPayload) => {
    setHappy(false);
    setShowDisplayMessage(true);
    setSearchParams({ ...payload, isHappy: false });
    setInitialIndex(0); // Reset index on new search
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
    setInitialIndex(0); // Reset index on clear
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
    data: isHappy ? happyNewsData : newsData ?? response?.data,
    isLoading,
    error,
    isHappy,
    isSearchModalOpen,
    displayMessage,
    showDisplayMessage,
    initialIndex,
    setShowDisplayMessage,
    onSearch,
    onClear,
    onOpenSearchModal,
    onCloseSearchModal,
    onLoadMore,
    onClickHappy,
  };
};

export default useNews;
