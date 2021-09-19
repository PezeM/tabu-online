import React, { useMemo } from 'react';
import { Grid, Text, useDisclosure } from '@chakra-ui/react';
import { RippledButton } from '@/components/RippledButton';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { SelectCardsContainer } from '@/components/SelectCards/SelectCardsContainer';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME } from '../../../../shared/constants';
import { setIsLoading } from '@/features/settings/settings.splice';

export const SelectCards = () => {
  const selectedCards = useAppSelector(selectLobby).settings.cardIds;
  const cardSets = useAppSelector(selectLobby).cardSets;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

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

  const saveSelectedCards = (cards: string[]) => {
    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { cardIds: cards });
    dispatch(setIsLoading(true));
    onClose();
  };

  return (
    <Grid templateColumns={['10fr 7fr', '10fr 4fr', '10fr 7fr', '10fr 5fr', '10fr 4fr']}>
      <RippledButton size={'sm'} onClick={onOpen}>{t('ui.selectCards')}</RippledButton>
      <Text pl={[4, 6, 8]}>
        {selectedCardsCount} {t('ui.cards')}
      </Text>

      <SelectCardsContainer isOpen={isOpen} onClose={onClose} saveSelectedCards={saveSelectedCards} />
    </Grid>
  );
};
