export enum SERVER_EVENT_NAME {
  FromServer = "testEvent",
  UserJoinLobby = "userJoinLobby",
  UserJoinedLobby = "userJoinedLobby",
  Notification = "notification",
  UserLeftRoom = "userLeftRoom",
  LobbyUserLeft = "lobbyUserLeft",
  CouldntCreateOrJoinLobby = "lobbyCouldntCreateOrJoin",
  LobbyUserChangedTeam = "lobbyUserChangedTeam",
  LobbySettingsChanged = "lobbySettingsChanged",
  LobbySettingsUpdateFailed = "lobbySettingsUpdateFailed",
  UpdateCardSets = 'updateCardSets',
}

export enum CLIENT_EVENT_NAME {
  Test = "testEventFromClient",
  CreateLobby = "createLobby",
  JoinLobby = "joinLobby",
  Disconnect = "disconnect",
  Disconnecting = "disconnecting",
  ChangeTeam = 'changeTeam',
  LobbyUpdateSettings = 'lobbyUpdateSettings',
  TryStartGame = 'lobbyTryStartGame',
}
