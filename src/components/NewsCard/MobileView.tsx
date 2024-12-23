import { NewsDataType } from "@/types/news";
import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import MobileSkeleton from "../Skeleton/Mobile";

type NewsCardMobileViewType = { news: NewsDataType; isLoading: boolean };

const NewsCardMobileView = ({news, isLoading}: NewsCardMobileViewType) => {


  return <Flex direction="column" gap="1rem" width="full">
    { <MobileSkeleton/> }


  </Flex>
};

export default NewsCardMobileView;
