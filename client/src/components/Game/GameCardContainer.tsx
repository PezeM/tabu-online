import React from 'react';
import { Box, List, ListItem, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentCard } from '@/features/game/game.slice';

export const GameCardContainer = () => {
  const card = useAppSelector(selectCurrentCard);

  const cardForbiddenWordsColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box display="flex" justifyContent="center">
      <Box
        maxW={'250px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        height={'fit-content'}
      >
        <Stack
          textAlign={'center'}
          p={3}
          align={'center'}
        >
          <Text
            fontSize={'xl'}
            fontWeight={700}
            p={2}
            px={4}
            color={useColorModeValue('gray.800', 'gray.100')}
            letterSpacing={'1px'}
          >
            {card?.name.toUpperCase()}
          </Text>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={4}>
          <List spacing={3}>
            {card &&
              card.forbiddenWords.map(word => (
                <ListItem textAlign="center" fontWeight={500} key={word} color={cardForbiddenWordsColor}>
                  {word.toUpperCase()}
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};