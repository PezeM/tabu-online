import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { PlayerCP } from '../../../../shared/dto';

interface InitialState {
  player?: PlayerCP;
}

const initialState: InitialState = {
  player: undefined,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<PlayerCP>) => {
      Object.assign(state, { player: action.payload });
    },
    resetPlayerState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { setPlayer, resetPlayerState } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player.player;
export const selectPlayerId = (state: RootState): string | undefined => state.player.player?.id;

export default playerSlice.reducer;
