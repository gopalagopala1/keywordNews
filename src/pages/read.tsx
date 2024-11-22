import NewsCard from "@/features/NewsCard/NewsCard";
import { Flex } from "@chakra-ui/react";

const Read = () => {
  return (
    <>
      <Flex
        justify="center"
        align="center"
        w="100%"
        gap="1rem"
        direction="column"
      >
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={false}
        />
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={false}
        />{" "}
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={true}
        />{" "}
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          url="https://www.google.com"
          image="https://via.placeholder.com/150"
          isLoading={true}
        />
      </Flex>
    </>
  );
};

export default Read;
