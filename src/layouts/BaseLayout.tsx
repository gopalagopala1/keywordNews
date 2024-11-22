import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxW="container.xl" height="full">
      {children}
    </Container>
  );
};

export default BaseLayout;
