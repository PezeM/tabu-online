import React from 'react';
import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { CardSetsCountDto } from '../../../../shared/dto';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { SelectCardTag } from '@/components/SelectCards/SelectCardTag';

interface Props {
  cardSet: CardSetsCountDto;
  isSelected: boolean;
  setIsSelected: (cardId: string) => void;
}

export const SelectCard = ({ cardSet, isSelected, setIsSelected }: Props) => {
  const { t } = useTranslation();

  const { tags, name, cardsCount, _id } = cardSet;
  const className = `card ${isSelected ? 'selected' : ''}`;

  return (
    <Box
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      className={className}
      onClick={() => setIsSelected(_id)}
    >
      <div className="check"><span className="checkmark">✔</span></div>

      <Text fontWeight={600} color={'gray.500'}>
        {t('ui.name')}
      </Text>

      <Heading fontSize={'xl'} fontFamily={'body'} mb={3}>
        {name}
      </Heading>

      <Text fontWeight={600} color={'gray.500'}>
        {t('ui.cardsCount')}
      </Text>

      <Heading fontSize={'xl'} fontFamily={'body'} mb={3}>
        {cardsCount} {t('ui.cards')}
      </Heading>

      <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
        {tags && tags.map(tag => <SelectCardTag key={tag} tag={tag} />)}
      </Stack>
    </Box>
  );
};