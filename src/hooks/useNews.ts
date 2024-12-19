import { FetchNewsPayload } from "@/types/news";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useFetchNews } from "./useFetchNews";

const useNews = () => {
  const [searchParams, setSearchParams] = useState<FetchNewsPayload>({});

  const { data, isLoading } = useFetchNews(searchParams);
  const error = data?.status == "error" ? data?.results : undefined;

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

  const onClear = () => {
    setSearchParams({});
  };

  const {
    isOpen: isSearchModalOpen,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

  return {
    data,
    isLoading,
    error,
    parseInput,
    onSearch,
    onClear,
    isSearchModalOpen,
    onOpenSearchModal,
    onCloseSearchModal,
  };
};

export default useNews;
