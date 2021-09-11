import React from 'react';
import { useTranslation } from 'react-i18next';
import { LobbySettingsContainer } from '@/components/LobbySettings/LobbySettingsContainer';
import { SettingsBox } from '@/components/LobbySettings/SettingsBox';
import { PizzaSliceIcon } from '@/styles/icons';
import { ChangeCardsLanguageSelect } from '@/components/LobbySettings/ChangeCardsLanguageSelect';
import { ChangeMaxPlayersNumberSelect } from '@/components/LobbySettings/ChangeMaxPlayersNumberSelect';
import { ChangePointsToWinSlider } from '@/components/LobbySettings/ChangePointsToWinSlider';
import { ChangeMaxSkipsNumberSlider } from '@/components/LobbySettings/ChangeMaxSkipsNumberSlider';

export const GameSettingsTab = React.memo(() => {
  const { t } = useTranslation();

  return (
    <LobbySettingsContainer>
      <SettingsBox
        title={t('ui.maxPlayersNumber')}
        tooltip={t('ui.maxPlayersNumberTooltip')}
        icon={<PizzaSliceIcon />}
      >
        <ChangeMaxPlayersNumberSelect />
      </SettingsBox>
      <SettingsBox
        title={t('ui.pointsToWin')}
        tooltip={t('ui.pointsToWinTooltip')}
        icon={<PizzaSliceIcon />}
      >
        <ChangePointsToWinSlider />
      </SettingsBox>
      <SettingsBox
        title={t('ui.cardsLanguage')}
        tooltip={t('ui.cardsLanguageTooltip')}
        icon={<PizzaSliceIcon />}
      >
        <ChangeCardsLanguageSelect />
      </SettingsBox>
      <SettingsBox title={t('ui.cards')} tooltip={t('ui.cardsTooltip')} icon={<PizzaSliceIcon />}>
        Cards
      </SettingsBox>
      <SettingsBox
        title={t('ui.roundTime')}
        tooltip={t('ui.roundTimeTooltip')}
        icon={<PizzaSliceIcon />}
      >
        Round time
      </SettingsBox>
      <SettingsBox
        title={t('ui.maxNumberOfSkips')}
        tooltip={t('ui.maxNumberOfSkipsTooltip')}
        icon={<PizzaSliceIcon />}
      >
        <ChangeMaxSkipsNumberSlider />
      </SettingsBox>
    </LobbySettingsContainer>
  );
});
