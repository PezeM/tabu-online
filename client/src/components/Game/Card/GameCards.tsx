import React, { useState } from 'react';
import { Card } from '@/components/Game/Card/Card';
import { CardDto } from '../../../../../shared/dto';
import i18n from '@/i18n';

interface Props {
  card: CardDto;
}

const emptyCard: CardDto = {
  name: i18n.t('cards.emptyName'),
  forbiddenWords: [
    i18n.t('cards.forbiddenWord'),
    i18n.t('cards.forbiddenWord'),
    i18n.t('cards.forbiddenWord'),
    i18n.t('cards.forbiddenWord'),
    i18n.t('cards.forbiddenWord'),
  ],
};

export const GameCards = ({ card }: Props) => {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState('100%');

  return (
    <>
      <Card
        card={emptyCard}
        key={index + 1}
        initial={{ scale: 0, y: 105, opacity: 0 }}
        animate={{ scale: 0.75, y: 30, opacity: 0.5 }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.4 },
        }}
      />
      <Card
        card={card}
        key={index}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          opacity: { duration: 0.2 },
        }}
        exitX={exitX}
        setExitX={setExitX}
        index={index}
        setIndex={setIndex}
        drag="x"
      />
    </>
  );
};
