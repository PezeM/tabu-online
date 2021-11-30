import React, { useState } from 'react';
import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { VoidFunction } from '../../../../shared/types';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { SelectCard } from '@/components/SelectCards/SelectCard';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  saveSelectedCards: (cards: string[]) => void;
}

export const SelectCardsContainer = ({ isOpen, onClose, saveSelectedCards }: Props) => {
  const serverSelectedCards = useAppSelector(selectLobby).settings.cardIds;
  const cardSets = useAppSelector(selectLobby).cardSets;
  const [selectedCards, setSelectedCards] = useState(serverSelectedCards || []);
  const { t } = useTranslation();

  const setIsSelected = (cardId: string) => {
    const index = selectedCards.indexOf(cardId);

    if (index === -1) {
      setSelectedCards([...selectedCards, cardId]);
    } else {
      const newArray = [...selectedCards];
      newArray.splice(index, 1);
      setSelectedCards(newArray);
    }
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset={'slideInBottom'}
      size={'5xl'}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('ui.selectCards')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            columnGap={'1em'}
            rowGap={'1em'}
          >
            {cardSets &&
              cardSets.map(cardSet => (
                <SelectCard
                  cardSet={cardSet}
                  key={cardSet._id}
                  setIsSelected={setIsSelected}
                  isSelected={selectedCards.some(s => s === cardSet._id)}
                />
              ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => saveSelectedCards(selectedCards)}>
            {t('ui.save')}
          </Button>
          <Button onClick={onClose}>{t('ui.cancel')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};