import { io, Socket } from 'socket.io-client';
import { EventsFromClient, EventsFromServer } from '../../../shared/socket';
import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import { showNotification } from '@/utils/notification';

export const socket: Socket<EventsFromServer, EventsFromClient> = io('http://localhost:3010/', {
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
