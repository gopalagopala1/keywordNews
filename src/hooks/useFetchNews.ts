import { apiClient } from "@/libs/apiClient";
import { FetchNewsPayload, NewsDataType } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

type FetchNewsResponseType = {
  data: NewsDataType[],
  status: string,
  nextPage: number
}

async function fetchNews(payload: FetchNewsPayload): Promise<FetchNewsResponseType> {
  const response = await apiClient.post("/news", {
    ...payload,
  });

  const data = response?.data?.results;
  const status = response?.data?.status;
  const nextPage = response?.data?.nextPage;
  return {data, status, nextPage};
};

export const useFetchNews = (payload: FetchNewsPayload) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news", payload],
    queryFn: () => fetchNews(payload),
  });

  return {  response: data , isLoading, error, refetch };
};
