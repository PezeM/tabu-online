import { LobbySettings } from "../interfaces";

export type GameSettings = Pick<
  LobbySettings,
  "roundTime" | "pointsToWin" | "maximumNumberOfSkips"
>;
