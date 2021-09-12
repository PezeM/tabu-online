import React, { useMemo } from 'react';
import { Grid, Text } from '@chakra-ui/react';
import { RippledButton } from '@/components/RippledButton';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';

export const SelectCards = () => {
  const selectedCards = useAppSelector(selectLobby).settings.cardIds;
  const cardSets = useAppSelector(selectLobby).cardSets;

  const selectedCardsCount = useMemo(() => {
    if (!selectedCards || selectedCards.length === 0) return 0;
    return selectedCards.reduce((previousValue, currentValue) => {
      const set = cardSets?.find(s => s._id === currentValue);
      if (set) {
        return previousValue + set.cardsCount;
      }

      return previousValue;
    }, 0);
  }, [cardSets, selectedCards]);

  return (
    <Grid templateColumns={['10fr 7fr', '10fr 4fr', '10fr 7fr', '10fr 5fr', '10fr 4fr']}>
      <RippledButton size={'sm'}>Select cards</RippledButton>
      <Text pl={[4, 6, 8]}>{selectedCardsCount} cards</Text>
    </Grid>
  );
};
