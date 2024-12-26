import { FetchNewsPayload } from "@/types/news";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetchNews } from "./useFetchNews";

const useNews = () => {
  const [searchParams, setSearchParams] = useState<FetchNewsPayload>({});
  const [nextPage, setNextPage]  = useState<number>();
  const [isHappy, setHappy] = useState(false);
  const { response , isLoading } = useFetchNews(searchParams);
  const error = response?.status == "error" ? response?.data : undefined as  {message: string}| undefined;

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

  const onSearch = (payload: FetchNewsPayload) => {
    setSearchParams({ ...payload });
  };


  useEffect(() => { 
    if(response?.nextPage){
      setNextPage(response.nextPage);
    }

  }, [response?.nextPage]);

  const onLoadMore = () => {
    setSearchParams({ ...searchParams, page: nextPage });
  }
  

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
  }

  return {
    data: response?.data,
    isLoading,
    error,
    isHappy,
    isSearchModalOpen,
    parseInput,
    onSearch,
    onClear,
    onOpenSearchModal,
    onCloseSearchModal,
    onLoadMore,
    onClickHappy
  };
};

export default useNews;
