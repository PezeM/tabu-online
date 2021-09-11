import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { setIsLoading } from '@/features/settings/settings.splice';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME } from '../../../../shared/constants/events';
import { SettingsSlider } from '@/components/LobbySettings/SettingsSlider';

export const ChangePointsToWinSlider = () => {
  const currentPointsToWin = useAppSelector(selectLobby).settings.pointsToWin;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changePointsToWin = (value: number) => {
    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { pointsToWin: value });
    dispatch(setIsLoading(true));
  };

  const textTransformer = (value: number) => {
    if (value < 99) {
      return `${value} ${t('ui.points')}`;
    }

    return t('ui.unlimited');
  };

  return (
    <SettingsSlider
      defaultValue={currentPointsToWin}
      onChangeValue={changePointsToWin}
      min={1}
      max={99}
      valueTextTransformer={textTransformer}
    />
  );
};
