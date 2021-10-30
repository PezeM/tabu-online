import { CardDto } from '../../../../../shared/dto';
import { Box, List, ListItem, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface GameCardProps {
  card: CardDto;
}

export const GameCard = ({ card }: GameCardProps) => {
  const cardForbiddenWordsColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <>
      <Stack
        textAlign={'center'}
        p={3}
        align={'center'}
        shadow={'lg'}
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderTopRadius={'30px'}
      >
        <Text
          fontSize={'xl'}
          fontWeight={700}
          p={2}
          px={4}
          color={useColorModeValue('gray.700', 'gray.100')}
          letterSpacing={'1px'}
        >
          {card?.name.toUpperCase()}
        </Text>
      </Stack>

      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        px={6}
        py={4}
        borderBottomRadius={'30px'}
        height={'full'}
      >
        <List spacing={3}>
          {card.forbiddenWords.map((word, index) => (
            <ListItem
              textAlign="center"
              fontWeight={500}
              key={index}
              color={cardForbiddenWordsColor}
            >
              {word.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};