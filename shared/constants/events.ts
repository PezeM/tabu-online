export enum SERVER_EVENT_NAME {
  FromServer = "testEvent",
  UserLobbyInvalidUsername = "userLobbyInvalidUsername",
  UserAlreadyInLobby = "userAlreadyInLobby",
  UserJoinLobby = "userJoinLobby",
  UserJoinedLobby = "userJoinedLobby",
  Notification = "notification",
  UserCouldntCreateLobby = "userCouldntCreateLobby",
}

export enum CLIENT_EVENT_NAME {
  Test = "testEventFromClient",
  CreateLobby = "createLobby",
  JoinLobby = "joinLobby",
}
