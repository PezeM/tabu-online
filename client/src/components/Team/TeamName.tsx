import React from 'react';
import { Team } from '../../../../shared/enums/client';
import { Box, Tag, TagLabel, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getTeamColor } from '@/utils/team';

interface Props {
  team: Team;
}

export const TeamName = ({ team }: Props) => {
  const { t } = useTranslation();
  const color = getTeamColor(team);

  return (
    <Box pb={[3, 6]}>
      <Text textAlign="center">
        <Tag size="lg" variant="solid" colorScheme={color}>
          <TagLabel>{t('ui.team.name')}</TagLabel>
          <TagLabel>&nbsp;</TagLabel>
          <TagLabel>
            <b>{t(`ui.team.${team}`)}</b>
          </TagLabel>
        </Tag>
      </Text>
    </Box>
  );
};