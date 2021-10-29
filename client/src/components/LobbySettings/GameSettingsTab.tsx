import React from 'react';
import { useTranslation } from 'react-i18next';
import { LobbySettingsContainer } from '@/components/LobbySettings/LobbySettingsContainer';
import { SettingsBox } from '@/components/LobbySettings/SettingsBox';
import { CardsIcon, ClockIcon, GlobeIcon, GroupIcon, TrophyIcon } from '@/styles/icons';
import { ChangeCardsLanguageSelect } from '@/components/LobbySettings/ChangeCardsLanguageSelect';
import { ChangeMaxPlayersNumberSelect } from '@/components/LobbySettings/ChangeMaxPlayersNumberSelect';
import { ChangePointsToWinSlider } from '@/components/LobbySettings/ChangePointsToWinSlider';
import { ChangeMaxSkipsNumberSlider } from '@/components/LobbySettings/ChangeMaxSkipsNumberSlider';
import { ChangeRoundTimeSlider } from '@/components/LobbySettings/ChangeRoundTimeSlider';
import { SelectCards } from '@/components/LobbySettings/SelectCards';
import { RepeatIcon } from '@chakra-ui/icons';

export const GameSettingsTab = React.memo(() => {
  const { t } = useTranslation();

  return (
    <LobbySettingsContainer>
      <SettingsBox
        title={t('ui.maxPlayersNumber')}
        tooltip={t('ui.maxPlayersNumberTooltip')}
        icon={<GroupIcon />}
      >
        <ChangeMaxPlayersNumberSelect />
      </SettingsBox>
      <SettingsBox
        title={t('ui.pointsToWin')}
        tooltip={t('ui.pointsToWinTooltip')}
        icon={<TrophyIcon />}
      >
        <ChangePointsToWinSlider />
      </SettingsBox>
      <SettingsBox
        title={t('ui.cardsLanguage')}
        tooltip={t('ui.cardsLanguageTooltip')}
        icon={<GlobeIcon />}
      >
        <ChangeCardsLanguageSelect />
      </SettingsBox>
      <SettingsBox title={t('ui.cards')} tooltip={t('ui.cardsTooltip')} icon={<CardsIcon />}>
        <SelectCards />
      </SettingsBox>
      <SettingsBox
        title={t('ui.roundTime')}
        tooltip={t('ui.roundTimeTooltip')}
        icon={<ClockIcon />}
      >
        <ChangeRoundTimeSlider />
      </SettingsBox>
      <SettingsBox
        title={t('ui.maxNumberOfSkips')}
        tooltip={t('ui.maxNumberOfSkipsTooltip')}
        icon={<RepeatIcon />}
      >
        <ChangeMaxSkipsNumberSlider />
      </SettingsBox>
    </LobbySettingsContainer>
  );
});
