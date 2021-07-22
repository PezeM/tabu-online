import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyCP } from "../../../../shared/dto/lobby.dto";
import { LobbySettings } from "../../../../shared/interfaces/lobby";
import { RootState } from "../../store";

const initialState: LobbyCP = {
  id: "0",
  settings: {} as LobbySettings,
  members: [],
  ownerId: "",
};

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setLobby: (state, action: PayloadAction<LobbyCP>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setLobby } = lobbySlice.actions;

export const selectIsInLobby = (state: RootState) => state.lobby.id !== "0";
export const selectLobby = (state: RootState) => state.lobby;

export default lobbySlice.reducer;
