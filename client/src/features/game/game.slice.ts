import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardDto, GameCP, GameTeamCP } from '../../../../shared/dto';
import { RootState } from '@/store';
import { GameState } from '@/types/game-state.enum';

interface InitialState {
  game?: GameCP;
  ownGameTeam?: GameTeamCP;
  currentGameTeam?: GameTeamCP;
  currentCard?: CardDto;
  state: GameState;
}

const initialState: InitialState = {
  game: undefined,
  ownGameTeam: undefined,
  state: GameState.GuessingTeam,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameCP>) => {
      state.game = action.payload;
    },
    setGameTeam: (state, action: PayloadAction<GameTeamCP>) => {
      state.ownGameTeam = action.payload;
    },
    setCurrentGameTeam: (state, action: PayloadAction<GameTeamCP>) => {
      state.currentGameTeam = action.payload;
    },
    setCurrentCard: (state, action: PayloadAction<CardDto | undefined>) => {
      state.currentCard = action.payload;
    },
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
    resetGameState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setGame,
  setGameTeam,
  setCurrentGameTeam,
  setCurrentCard,
  setGameState,
  resetGameState,
} = gameSlice.actions;

export const selectIsInGame = (state: RootState) => state.game.game !== undefined;
export const selectGame = (state: RootState) => state.game.game;
export const selectOwnGameTeam = (state: RootState) => state.game.ownGameTeam;
export const selectCurrentGameTeam = (state: RootState) => state.game.currentGameTeam;
export const selectGameState = (state: RootState) => state.game.state;

export default gameSlice.reducer;
