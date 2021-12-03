import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { setIsLoading } from '@/features/settings/settingsSlice';
import { socketService } from '@/services/socket.service';
import { MAX_POINTS_TO_WIN } from '../../../../shared/constants';
import { SettingsSlider } from '@/components/LobbySettings/SettingsSlider';

export const ChangePointsToWinSlider = () => {
  const currentPointsToWin = useAppSelector(selectLobby).settings.pointsToWin;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changePointsToWin = (value: number) => {
    socketService.updateLobbySettings({ pointsToWin: value });
    dispatch(setIsLoading(true));
  };

  const textTransformer = (value: number) => {
    if (value < MAX_POINTS_TO_WIN) {
      return `${value} ${t('ui.points')}`;
    }

    return t('ui.unlimited');
  };

  return (
    <SettingsSlider
      defaultValue={currentPointsToWin}
      onChangeValue={changePointsToWin}
      min={1}
      max={MAX_POINTS_TO_WIN}
      valueTextTransformer={textTransformer}
    />
  );
};
