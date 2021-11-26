import { useEffect } from 'react';
import { socketService } from '@/services/socket';

export const useListenServerEvent = (...[ev, listener]: Parameters<typeof socketService.socket.on>): void => {
  useEffect(() => {
    socketService.socket.on(ev, listener);
    return () => void socketService.socket.off(ev, listener);
  }, [ev, listener]);
};