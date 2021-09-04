import React, { ReactElement } from 'react';
import { Box, Flex, Grid, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Props {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const SettingsBox = ({ title, description, icon, children }: Props) => {
  const isMobile = useIsMobile();

  let clonedIcon;
  if (icon) {
    clonedIcon = React.cloneElement(icon as ReactElement, { w: [4, 6, 8], h: [4, 6, 8] });
  }

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      rowGap={2}
      justifyItems={{ base: 'center', md: 'baseline' }}
    >
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} flex={'1 1 0%'}>
        {clonedIcon}
        <Flex flexDirection={'column'} flex={'1 1 0%'} marginLeft={[2, 4]}>
          <Tooltip isDisabled={!isMobile} label={description}>
            <Heading size={'md'}>{title.toUpperCase()}</Heading>
          </Tooltip>
          {!isMobile && <Text variant={'accentAlternative'}>{description}</Text>}
        </Flex>
      </Box>
      <Box flex={'1 1 0%'} marginLeft={{ base: 0, md: 8 }}>
        {children && children}
      </Box>
    </Grid>
  );
};
