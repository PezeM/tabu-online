import React from 'react';
import { Badge, useColorModeValue } from '@chakra-ui/react';

interface Props {
  tag: string;
}

export const SelectCardTag = ({ tag }: Props) => {
  const tagBg = useColorModeValue('blue.100', 'gray.800');

  return (
    <Badge px={2} py={1} bg={tagBg} fontWeight={'400'}>
      {tag}
    </Badge>
  );
};