import { configureStore } from '@reduxjs/toolkit';
import lobbyCounter from './features/lobby/lobby.slice';

export const store = configureStore({
  reducer: {
    lobby: lobbyCounter,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;