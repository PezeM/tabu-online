import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LobbyCP } from '../../../../shared/dto/lobby.dto';
import { LobbySettings } from '../../../../shared/interfaces/lobby';
import { RootState } from '@/store';
import { ClientCP } from '../../../../shared/dto/client.dto';
import { Team } from '../../../../shared/enums/client';

interface RemoveMemberInterface {
  clientId: string;
  newOwnerId: string;
}

interface ChangeMemberTeamInterface {
  clientId: string;
  newTeam: Team;
}

const initialState: LobbyCP = {
  id: '0',
  settings: {} as LobbySettings,
  members: [],
  ownerId: '',
};

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setLobby: (state, action: PayloadAction<LobbyCP>) => {
      Object.assign(state, action.payload);
    },
    addMember: (state, action: PayloadAction<ClientCP>) => {
      const { payload } = action;
      const existingMemberIndex = state.members.findIndex(m => m.id === payload.id);
      if (existingMemberIndex > -1) {
        state.members.splice(existingMemberIndex, 1);
      }

      state.members.push(payload);
    },
    removeMember: (state, action: PayloadAction<RemoveMemberInterface>) => {
      const { newOwnerId, clientId } = action.payload;

      const memberIndex = state.members.findIndex(m => m.id === clientId);
      if (memberIndex >= 0) {
        state.members.splice(memberIndex, 1);
      }

      if (state.ownerId !== newOwnerId) {
        state.ownerId = newOwnerId;
      }
    },
    changeMemberTeam: (state, action: PayloadAction<ChangeMemberTeamInterface>) => {
      const { newTeam, clientId } = action.payload;

      const member = state.members.find(m => m.id === clientId);
      if (member) {
        member.team = newTeam;
      }
    },
    changeLobbySettings: (state, action: PayloadAction<LobbySettings>) => {
      state.settings = action.payload;
    },
    resetLobbyState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setLobby,
  addMember,
  removeMember,
  changeMemberTeam,
  changeLobbySettings,
  resetLobbyState,
} = lobbySlice.actions;

export const selectIsInLobby = (state: RootState) => state.lobby.id !== '0';
export const selectLobby = (state: RootState) => state.lobby;
export const selectLobbyId = (state: RootState) => state.lobby.id;
export const selectOwnerId = (state: RootState) => state.lobby.ownerId;
export const selectIsLobbyOwner = (state: RootState) =>
  state.lobby.ownerId === state.auth.client?.id;
export const selectLobbyMembers = (state: RootState) => state.lobby.members;

export default lobbySlice.reducer;
