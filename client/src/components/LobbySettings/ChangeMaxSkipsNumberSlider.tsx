import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { setIsLoading } from '@/features/settings/settingsSlice';
import { socketService } from '@/services/socket.service';
import { MAX_SKIPS_NUMBER } from '../../../../shared/constants';
import { SettingsSlider } from '@/components/LobbySettings/SettingsSlider';

export const ChangeMaxSkipsNumberSlider = React.memo(() => {
  const currentMaxSkipsNumber = useAppSelector(selectLobby).settings.maximumNumberOfSkips;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changeMaximumNumberOfSkips = (value: number) => {
    socketService.updateLobbySettings({ maximumNumberOfSkips: value });
    dispatch(setIsLoading(true));
  };

  const textTransformer = useCallback(
    (value: number) => {
      if (value <= 0) {
        return t('ui.zero');
      }

      if (value < MAX_SKIPS_NUMBER) {
        return `${value} ${t('ui.skips')}`;
      }

      return t('ui.unlimited');
    },
    [t],
  );

  return (
    <SettingsSlider
      defaultValue={currentMaxSkipsNumber}
      onChangeValue={changeMaximumNumberOfSkips}
      min={1}
      max={MAX_SKIPS_NUMBER}
      valueTextTransformer={textTransformer}
    />
  );
});
