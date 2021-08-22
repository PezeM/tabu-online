import React from 'react';
import { chakra, Tooltip } from '@chakra-ui/react';
import { Token } from '@chakra-ui/styled-system/dist/types/utils';
import * as CSS from 'csstype';

interface Props {
  bottom: string;
  right: string;
  bg?: Token<CSS.Property.Color, 'colors'>;
  children?: React.ReactNode;
  tooltip?: string;

  [x: string]: any;
}

export const MemberBadge = ({
  bg = 'teal.400',
  bottom = '-15px',
  right = '2px',
  tooltip,
  children,
  ...rest
}: Props) => {
  return (
    <Tooltip label={tooltip}>
      <chakra.span
        pos="absolute"
        bottom={bottom}
        right={right}
        padding="0.15rem"
        fontSize="0px"
        lineHeight="0px"
        color="black"
        transform="translate(50%,-50%)"
        bg={bg}
        rounded="full"
        {...rest}
      >
        {children}
      </chakra.span>
    </Tooltip>
  );
};
