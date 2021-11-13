import React, { useState } from 'react';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '../../../shared/constants';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { getBrowserLanguage } from '@/utils/browser';
import { CardSetsCountDto, ClientCP, LobbyCP } from '../../../shared/dto';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setLobby, updateCardSets } from '@/features/lobby/lobby.slice';
import { setClient } from '@/features/client/client.splice';
import { HomePage } from '@/components/HomePage';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSubmit = (username: string) => {
    socket.auth = { username };
    socket.connect();

    setIsLoading(true);

    socket.emit(CLIENT_EVENT_NAME.CreateLobby, username, getBrowserLanguage());
  };

  useListenServerEvent(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby, () => {
    setIsLoading(false);
  });

  useListenServerEvent(
    SERVER_EVENT_NAME.UserJoinLobby,
    (lobbyCP: LobbyCP, clientCP: ClientCP, cardSets?: CardSetsCountDto[]) => {
      dispatch(setLobby(lobbyCP));
      dispatch(setClient(clientCP));
      dispatch(updateCardSets(cardSets));

      setIsLoading(false);
      history.push('/lobby');
    },
  );

  return <HomePage onSubmit={onSubmit} isLoading={isLoading} />;
};
