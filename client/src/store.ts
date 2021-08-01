import { configureStore } from '@reduxjs/toolkit';
import lobbyReducer from './features/lobby/lobby.slice';
import clientReducer from './features/client/client.splice';

export const store = configureStore({
  reducer: {
    lobby: lobbyReducer,
    auth: clientReducer
  },
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;