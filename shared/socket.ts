import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "./constants";
import { NotificationVariation } from "./notification";
import {
  CardDto,
  CardSetsCountDto,
  ClientCP,
  GameCP,
  GameTeamCP,
  LobbyCP,
  PlayerCP,
  PlayerStatsCP,
} from "./dto";
import { Team } from "./enums";
import { LobbySettings } from "./interfaces";

export interface EventsFromServer {
  [SERVER_EVENT_NAME.FromServer]: (co: string[]) => void;
  [SERVER_EVENT_NAME.UserJoinLobby]: (
    lobbyCP: LobbyCP,
    clientCP: ClientCP,
    cardSets?: CardSetsCountDto[]
  ) => void;
  [SERVER_EVENT_NAME.UserJoinedLobby]: (clientCP: ClientCP) => void;
  [SERVER_EVENT_NAME.Notification]: (
    message: string,
    variant: NotificationVariation
  ) => void;
  [SERVER_EVENT_NAME.UserLeftRoom]: () => void;
  [SERVER_EVENT_NAME.LobbyUserLeft]: (
    clientId: string,
    ownerId: string
  ) => void;
  [SERVER_EVENT_NAME.CouldntCreateOrJoinLobby]: () => void;
  [SERVER_EVENT_NAME.LobbyUserChangedTeam]: (
    clientId: string,
    team: Team
  ) => void;
  [SERVER_EVENT_NAME.LobbySettingsChanged]: (
    lobbySettings: LobbySettings
  ) => void;
  [SERVER_EVENT_NAME.LobbySettingsUpdateFailed]: (msg: string) => void;
  [SERVER_EVENT_NAME.UpdateCardSets]: (cardSets: CardSetsCountDto[]) => void;
  [SERVER_EVENT_NAME.StartGameFailed]: (msg: string) => void;
  [SERVER_EVENT_NAME.ErrorCreatingGame]: (msg: string) => void;
  [SERVER_EVENT_NAME.PlayerLeftGame]: () => void;
  [SERVER_EVENT_NAME.GamePlayerLeft]: (playerId: string) => void;
  [SERVER_EVENT_NAME.GameStarted]: (
    gameCP: GameCP,
    playerCP: PlayerCP,
    teamMap: Record<Team, GameTeamCP>
  ) => void;
  [SERVER_EVENT_NAME.GameRoundExplainerPerson]: (currentCard: CardDto) => void;
  [SERVER_EVENT_NAME.GameGuessingTeamPlayer]: () => void;
  [SERVER_EVENT_NAME.GameEnemyTeamPlayer]: (currentCard: CardDto) => void;
  [SERVER_EVENT_NAME.GameUpdateGameTeam]: (gameTeamCP: GameTeamCP) => void;
  [SERVER_EVENT_NAME.GameRoundEnded]: () => void;
  [SERVER_EVENT_NAME.GameHasEnded]: (
    teamMap: Record<Team, GameTeamCP>,
    playerStatsCP: PlayerStatsCP
  ) => void;
}

export interface EventsFromClient {
  [CLIENT_EVENT_NAME.Test]: (msg: string) => void;
  [CLIENT_EVENT_NAME.CreateLobby]: (username: string, language: string) => void;
  [CLIENT_EVENT_NAME.JoinLobby]: (username: string, lobbyId: string) => void;
  [CLIENT_EVENT_NAME.Disconnect]: (reason: string) => void;
  [CLIENT_EVENT_NAME.Disconnecting]: (reason: string) => void;
  [CLIENT_EVENT_NAME.ChangeTeam]: () => void;
  [CLIENT_EVENT_NAME.LobbyUpdateSettings]: (
    settings: Partial<LobbySettings>
  ) => void;
  [CLIENT_EVENT_NAME.TryStartGame]: () => void;
  [CLIENT_EVENT_NAME.GameSkipCard]: (cardName: string) => void;
  [CLIENT_EVENT_NAME.GameValidAnswer]: (cardName: string) => void;
  [CLIENT_EVENT_NAME.GameForbiddenWordUsed]: (cardName: string) => void;
  [CLIENT_EVENT_NAME.GameStartNextRound]: () => void;
}
