import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  children?: React.ReactNode;
}

export const LayoutContainer = ({ children }: Props) => {
  return (
    <Box
      h="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Flex
        margin="0 auto"
        direction="column"
        maxW="1250px"
        // px={[4, 8, 16]}
        py={[8, 16, 32]}
        width={"100%"}
        flex={"1 0 auto"}
      >
        {children}
      </Flex>
    </Box>
  );
};
