import React, { ReactElement, useMemo } from 'react';
import { Box, Flex, Grid, Text, Tooltip } from '@chakra-ui/react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Props {
  title: string;
  tooltip?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const SettingsBox = React.memo(({ title, description, tooltip, icon, children }: Props) => {
  const isMobile = useIsMobile();
  const displayDescription = useMemo(() => description && !isMobile, [description, isMobile]);
  const tooltipText = useMemo(() => (tooltip ? tooltip : description), [description, tooltip]);

  const clonedIcon = useMemo(
    () =>
      icon
        ? React.cloneElement(icon as ReactElement, {
            w: [4, 6, 8],
            h: [4, 6, 8],
          })
        : null,
    [icon],
  );

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      rowGap={2}
      justifyItems={{ base: 'center', md: 'baseline' }}
    >
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} flex={'1 1 0%'}>
        {clonedIcon}
        <Flex flexDirection={'column'} flex={'1 1 0%'} marginLeft={[2, 4]}>
          <Tooltip isDisabled={!tooltip && !isMobile} label={tooltipText}>
            <Text fontSize={['md', 'lg']}>{title.toUpperCase()}</Text>
          </Tooltip>
          {displayDescription && <Text variant={'accentAlternative'}>{description}</Text>}
        </Flex>
      </Box>
      <Box flex={'1 1 0%'} paddingLeft={{ base: 0, md: 8 }} width={'100%'}>
        {children && children}
      </Box>
    </Grid>
  );
});
