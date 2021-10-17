import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardDto, GameCP, GameTeamCP } from '../../../../shared/dto';
import { RootState } from '@/store';
import { GameState } from '@/types/game-state.enum';
import { Team } from '../../../../shared/enums';

interface InitialState {
  game?: GameCP;
  currentCard?: CardDto;
  state: GameState;
  teams?: Record<Team, GameTeamCP>;
}

const initialState: InitialState = {
  game: undefined,
  state: GameState.GuessingTeam,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameCP>) => {
      state.game = action.payload;
    },
    setCurrentCard: (state, action: PayloadAction<CardDto | undefined>) => {
      state.currentCard = action.payload;
    },
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
    setGameTeams: (state, action: PayloadAction<Record<Team, GameTeamCP>>) => {
      state.teams = action.payload;
    },
    setGameTeam: (state, action: PayloadAction<GameTeamCP>) => {
      const { team } = action.payload;

      if (!state.teams || !state.teams[team]) {
        return;
      }

      state.teams[team] = action.payload;
    },
    resetGameState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { setGame, setCurrentCard, setGameState, resetGameState, setGameTeam, setGameTeams } =
  gameSlice.actions;

export const selectIsInGame = (state: RootState) => state.game.game !== undefined;
export const selectGame = (state: RootState) => state.game.game;
export const selectGameState = (state: RootState) => state.game.state;
export const selectCurrentCard = (state: RootState) => state.game.currentCard;
export const selectGameTeams = (state: RootState) => state.game.teams;

export default gameSlice.reducer;
