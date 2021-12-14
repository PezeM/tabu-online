import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { setIsLoading } from '@/features/settings/settingsSlice';
import { socketService } from '@/services/socket.service';
import { MAX_ROUND_TIME, MIN_ROUND_TIME } from '../../../../shared/constants';
import { SettingsSlider } from '@/components/LobbySettings/SettingsSlider';
import { formatTimeToMmSsFormat } from '@/utils/time';

export const ChangeRoundTimeSlider = React.memo(() => {
  const currentRoundTime = useAppSelector(selectLobby).settings.roundTime;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changeMaximumNumberOfSkips = (value: number) => {
    socketService.updateLobbySettings({ roundTime: value });
    dispatch(setIsLoading(true));
  };

  const textTransformer = useCallback(
    (value: number) => {
      const seconds = value / 1000;
      if (seconds <= 0) {
        return t('ui.zero');
      }

      return formatTimeToMmSsFormat(seconds);
    },
    [t],
  );

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
});
