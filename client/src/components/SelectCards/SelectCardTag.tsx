import React from 'react';
import { Badge, useColorModeValue } from '@chakra-ui/react';

interface Props {
  index: number;
  tag: string;
}

export const SelectCardTag = ({ tag, index }: Props) => {
  const tagBg = useColorModeValue('gray.50', 'gray.800');

  return <Badge px={2}
                key={index}
                py={1}
                bg={tagBg}
                fontWeight={'400'}>{tag}</Badge>;
};