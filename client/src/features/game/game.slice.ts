import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameCP, GameTeamCP } from '../../../../shared/dto';
import { RootState } from '@/store';

interface InitialState {
  game?: GameCP;
  gameTeam?: GameTeamCP;
}

const initialState: InitialState = {
  game: undefined,
  gameTeam: undefined,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameCP>) => {
      Object.assign(state, { game: action.payload });
    },
    setGameTeam: (state, action: PayloadAction<GameTeamCP>) => {
      Object.assign(state, { gameTeam: action.payload });
    },
    resetGameState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { setGame, setGameTeam, resetGameState } = gameSlice.actions;

export const selectIsInGame = (state: RootState) => state.game.game !== undefined;
export const selectGame = (state: RootState) => state.game.game;
export const selectGameTeam = (state: RootState) => state.game.gameTeam;

export default gameSlice.reducer;
