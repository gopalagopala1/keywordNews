import { useFetchNews } from "../api/fetch-news";

const useReadNews = () => {

    // fetching news 
    const {data: newsData, isLoading: isNewsDataLoading, error: newsError} = useFetchNews({});

    return {
        newsData, 
        isNewsDataLoading,
        newsError
    }

}

export default useReadNews; 