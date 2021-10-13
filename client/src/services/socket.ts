import { io, Socket } from 'socket.io-client';
import { EventsFromClient, EventsFromServer } from '../../../shared/socket';
import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import { showNotification } from '@/utils/notification';

console.log(process.env);

export const socket: Socket<EventsFromServer, EventsFromClient> = io(process.env.REACT_APP_SERVER_URL as string, {
  autoConnect: false
});

if (process.env.NODE_ENV === 'development') {
  const toast = createStandaloneToast({
    theme,
    colorMode: theme.config.initialColorMode
  });

  socket.onAny((eventName, ...args) => {
    console.log(`Event: ${eventName} Args:`, args);
    showNotification(toast, JSON.stringify(args), { title: eventName, duration: 3000 });
  });
}
