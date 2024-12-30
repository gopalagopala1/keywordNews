import { FetchNewsPayload, NewsDataType } from "@/types/news";
import { useDisclosure } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetchNews } from "./useFetchNews";
import useMobileView from "./useMobileView";

const useNews = () => {
  const [newsData, setNewsData] = useState<NewsDataType[]>();

  const [happyNewsData, setHappyNewsData] = useState<NewsDataType[]>();
  const [isHappy, setHappy] = useState(false);

  const [searchParams, setSearchParams] = useState<FetchNewsPayload>({});
  const [nextPage, setNextPage] = useState<number>();

  const [showDisplayMessage, setShowDisplayMessage] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { response, isLoading } = useFetchNews(searchParams);
  const displayMessage = response?.errorMessage || "";
  const error =
    response?.status == "error"
      ? response?.data
      : (undefined as { message: string } | undefined);

  const router = useRouter();

  useEffect(() => {
    if (!response && !isLoading && !(!!isHappy)) {
      router.push("/error");
    } else if (response && response.data && response?.status !== "error") {
      if (isHappy) {
        setCurrentIndex(0);
        setHappyNewsData([...response?.data]);
      } else if (!response.errorMessage) {
        const newData = response?.data ?? [];

        let updatedData = [];
        const {page, ...rest} = searchParams;
        const isEmpty = _.isEmpty(rest)
        
        if (isEmpty) {
          updatedData = _.uniqBy(
            [...(newsData ?? []), ...newData],
            "article_id"
          );
          
          const existingDataLength = newsData?.length ?? 0;
          setCurrentIndex(existingDataLength);
        } else {
          updatedData = _.uniqBy(
            [...newData, ...(newsData ?? [])],
            "article_id"
          );
          setCurrentIndex(0);
        }

        setNewsData(updatedData);

        // setting next page
        if (response?.nextPage) {
          setNextPage(response.nextPage);
        }

        
      } else if (response.errorMessage) {
        setCurrentIndex(0);
        setNewsData([...response?.data]);
      }
    }
  }, [response, isHappy, isLoading]);

  const onSearch = (payload: FetchNewsPayload) => {
    setHappy(false);
    setShowDisplayMessage(true);
    setSearchParams({ ...payload, isHappy: false });
    setCurrentIndex(0); // Reset index on new search
  };

  useEffect(() => {
    if (response?.nextPage) {
      setNextPage(response.nextPage);
    }
  }, [response?.nextPage]);

  const onLoadMore = () => {
    setSearchParams({ ...searchParams, page: nextPage });
    setCurrentIndex((prev) => prev + 1);
  };

  const onClear = () => {
    setSearchParams({});
    setCurrentIndex(0); // Reset index on clear
  };

  const {
    isOpen: isSearchModalOpen,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

  const onClickHappy = (isHappy: boolean = false) => {
    setHappy(isHappy);
    setSearchParams({ ...searchParams, isHappy });
  };

  const mobileViewHook = useMobileView({
    currentIndex,
    setCurrentIndex,
    data: newsData,
    onLoadMore,
  });

  

  return {
    data: isHappy ? happyNewsData : newsData ?? response?.data,
    isLoading,
    error,
    isHappy,
    isSearchModalOpen,
    displayMessage,
    showDisplayMessage,
    setShowDisplayMessage,
    onSearch,
    onClear,
    onOpenSearchModal,
    onCloseSearchModal,
    onLoadMore,
    onClickHappy,
    mobileViewHook,
  };
};

export default useNews;
