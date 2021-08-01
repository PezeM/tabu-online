import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ClientCP } from '../../../../shared/dto/client.dto';
import { Team } from '../../../../shared/enums/client';

interface InitialState {
  client?: ClientCP;
}

const initialState: InitialState = {
  client: undefined,
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<ClientCP>) => {
      Object.assign(state, { client: action.payload });
    },
    changeClientTeam(state, action: PayloadAction<Team>) {
      if (!state.client) return;
      state.client.team = action.payload;
    },
  },
});

export const { setClient, changeClientTeam } = clientSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.client !== undefined;
export const selectClient = (state: RootState) => state.auth.client;
export const selectClientId = (state: RootState): string | undefined => state.auth.client?.id;

export default clientSlice.reducer;
