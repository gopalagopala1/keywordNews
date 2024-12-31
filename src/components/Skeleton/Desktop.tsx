import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react"

 const DesktopSkeleton = () => (
    <Flex h="full" direction="column" paddingTop="1rem" width="full">
    <Skeleton height="50%" width="100%" />
    <SkeletonText mt="4" noOfLines={2} spacing="4" />
    <SkeletonText mt="4" noOfLines={10} spacing="4" />
  </Flex>
 )

  export default DesktopSkeleton