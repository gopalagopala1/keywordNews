import { apiClient } from "@/libs/apiClient";
import { FetchNewsPayload } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

// fetch new from the api

const fetchNews = async (payload: FetchNewsPayload) => {
  const response = await apiClient.post("/news", {
    params: payload,
  });

  return response.data;
};

export const useFetchNews = (payload: FetchNewsPayload) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news", payload],
    queryFn: () => fetchNews(payload),
  });

  return { data, isLoading, error, refetch };
};
