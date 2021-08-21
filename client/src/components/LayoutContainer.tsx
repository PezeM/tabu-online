import * as React from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface Props {
  children?: React.ReactNode;
}

export const LayoutContainer = ({ children }: Props) => {
  return (
    <Box
      h="100vh"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      px={[8, 16, 32]}
      py={[1, 2]}
    >
      <Flex
        margin="0 auto"
        direction="column"
        maxW="1250px"
        maxH='90%'
        my={[8, 16, 24]}
        p={4}
        width={'100%'}
        flex={'1 0 auto'}
        boxShadow={'xl'}
        rounded={'md'}
        border={'1px'}
        borderColor={'gray.600'}
        borderRadius={'md'}
      >
        {children}
      </Flex>
    </Box>
  );
};
