import React, { ReactElement } from 'react';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const SettingsBox = ({ title, description, icon, children }: Props) => {
  let clonedIcon;
  if (icon) {
    clonedIcon = React.cloneElement(icon as ReactElement, { w: [6, 8], h: [6, 8] });
  }

  return (
    <Grid direction={'row'} alignItems={'center'} templateColumns={['1fr', 'repeat(2, 1fr)']}>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} flex={'1 1 0%'}>
        {clonedIcon}
        <Flex flexDirection={'column'} flex={'1 1 0%'} marginLeft={[0, 4]}>
          <Heading size={'md'}>{title.toUpperCase()}</Heading>
          <Text>{description}</Text>
        </Flex>
      </Box>
      <Box flex={'1 1 0%'} marginLeft={[0, 8]}>
        {children && children}
      </Box>
    </Grid>
  );
};
