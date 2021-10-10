import { configureStore } from '@reduxjs/toolkit';
import lobbyReducer from './features/lobby/lobby.slice';
import clientReducer from './features/client/client.splice';
import settingsReducer from './features/settings/settings.splice';
import gameReducer from './features/game/game.slice';
import playerReducer from './features/player/player.slice';

export const store = configureStore({
  reducer: {
    lobby: lobbyReducer,
    auth: clientReducer,
    settings: settingsReducer,
    game: gameReducer,
    player: playerReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;