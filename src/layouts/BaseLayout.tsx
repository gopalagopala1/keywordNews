import { useDeviceSizes } from "@/hooks/useDeviceSizes";
import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

const BaseLayout = ({ children }: { children: ReactNode }) => {

  const {isMobile } = useDeviceSizes();

  return (
    <Container maxW="container.xl" height="100vh">
      {children}
    </Container>
  );
};

export default BaseLayout;
