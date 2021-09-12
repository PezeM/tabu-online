import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { setIsLoading } from '@/features/settings/settings.splice';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME, MAX_ROUND_TIME, MIN_ROUND_TIME } from '../../../../shared/constants';
import { SettingsSlider } from '@/components/LobbySettings/SettingsSlider';
import { formatTimeToMmSsFormat } from '@/utils/time';

export const ChangeRoundTimeSlider = () => {
  const currentRoundTime = useAppSelector(selectLobby).settings.roundTime;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changeMaximumNumberOfSkips = (value: number) => {
    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { roundTime: value });
    dispatch(setIsLoading(true));
  };

  const textTransformer = (value: number) => {
    const seconds = value / 1000;
    if (seconds <= 0) {
      return t('ui.zero');
    }

    return formatTimeToMmSsFormat(seconds);
  };

  return (
    <SettingsSlider
      defaultValue={currentRoundTime}
      onChangeValue={changeMaximumNumberOfSkips}
      min={MIN_ROUND_TIME}
      max={MAX_ROUND_TIME}
      step={10 * 1000}
      valueTextTransformer={textTransformer}
    />
  );
};
