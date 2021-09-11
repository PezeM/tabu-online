import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { useTranslation } from 'react-i18next';
import { setIsLoading } from '@/features/settings/settings.splice';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME, MAX_SKIPS_NUMBER } from '../../../../shared/constants';
import { SettingsSlider } from '@/components/LobbySettings/SettingsSlider';

export const ChangeMaxSkipsNumberSlider = () => {
  const currentMaxSkipsNumber = useAppSelector(selectLobby).settings.maximumNumberOfSkips;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changeMaximumNumberOfSkips = (value: number) => {
    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { maximumNumberOfSkips: value });
    dispatch(setIsLoading(true));
  };

  const textTransformer = (value: number) => {
    if (value <= 0) {
      return t('ui.zero');
    }

    if (value < MAX_SKIPS_NUMBER) {
      return `${value} ${t('ui.skips')}`;
    }

    return t('ui.unlimited');
  };

  return (
    <SettingsSlider
      defaultValue={currentMaxSkipsNumber}
      onChangeValue={changeMaximumNumberOfSkips}
      min={1}
      max={MAX_SKIPS_NUMBER}
      valueTextTransformer={textTransformer}
    />
  );
};
