import React, { useMemo } from 'react';
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

export const SelectCard = React.memo(({ cardSet, isSelected, setIsSelected }: Props) => {
  const { t } = useTranslation();

  const { tags, name, cardsCount, _id } = cardSet;
  const className = useMemo(() => `card ${isSelected ? 'selected' : ''}`, [isSelected]);

  return (
    <Box
      w={'full'}
      bg={useColorModeValue('whiteAlpha.600', 'gray.900')}
      boxShadow={'xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      className={className}
      onClick={() => setIsSelected(_id)}
    >
      <div className="check">
        <span className="checkmark">✔</span>
      </div>

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
});