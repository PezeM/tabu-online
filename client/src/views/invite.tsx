import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { socketService } from '@/services/socket';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { setLobby } from '@/features/lobby/lobby.slice';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setClient } from '@/features/client/client.splice';
import { ClientCP, LobbyCP } from '@/../../shared/dto';
import { HomePage } from '@/components/HomePage';

type ParamsType = {
  id: string;
};

export const Invite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const params = useParams<ParamsType>();
  const dispatch = useAppDispatch();

  const onSubmit = (username: string) => {
    const socket = socketService.socket;
    socket.auth = { username };
    socket.connect();

    setIsLoading(true);

    socketService.joinLobby(username, params.id);
  };

  useListenServerEvent(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby, () => {
    setIsLoading(false);
  });

  useListenServerEvent(SERVER_EVENT_NAME.UserJoinLobby, (lobbyCP: LobbyCP, clientCP: ClientCP) => {
    dispatch(setLobby(lobbyCP));
    dispatch(setClient(clientCP));

    setIsLoading(false);
    history.push('/lobby');
  });

  return <HomePage onSubmit={onSubmit} isLoading={isLoading} />;
};
