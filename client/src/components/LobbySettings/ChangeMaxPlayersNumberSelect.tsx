import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Select } from '@chakra-ui/react';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { setIsLoading } from '@/features/settings/settingsSlice';
import { socketService } from '@/services/socket.service';
import { useTranslation } from 'react-i18next';

const AVAILABLE_PLAYERS_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const ChangeMaxPlayersNumberSelect = () => {
  const dispatch = useAppDispatch();
  const currentMaxPlayers = useAppSelector(selectLobby).settings.maxPlayers;
  const { t } = useTranslation();

  const playersText = t('lobby.playersText');

  const changeMaxPlayersNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    socketService.updateLobbySettings({ maxPlayers: value });
    dispatch(setIsLoading(true));
  };

  return (
    <Select value={currentMaxPlayers} onChange={changeMaxPlayersNumber}>
      {AVAILABLE_PLAYERS_VALUES.map(players => {
        return (
          <option key={players} value={players}>
            {players} {playersText}
          </option>
        );
      })}
    </Select>
  );
};
