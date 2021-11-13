import React from 'react';
import { Box, chakra, TabProps, Text, useStyles, useTab } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// @ts-ignore
const StyledTab = chakra('button', { themeKey: 'Tabs.Tab' });

interface Props extends TabProps {
  icon: React.ReactElement;
}

export function CustomTab(props: Props) {
  const tabProps = useTab(props);
  const styles = useStyles();
  const isSelected = tabProps['aria-selected'];

  return (
    <StyledTab
      __css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...styles.tab }}
      {...tabProps}
    >
      {isSelected ? <motion.div layoutId="underline" /> : null}
      <Box as={'span'} mr={[2, 3, 4]}>
        {props.icon}
      </Box>
      <Text fontWeight={'600'}>{tabProps.children}</Text>
    </StyledTab>
  );
}
