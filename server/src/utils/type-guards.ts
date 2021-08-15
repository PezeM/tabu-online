import { LobbyLanguage } from '@shared/enums/lobby';

export const isLobbyLanguage = (language: any): language is LobbyLanguage => {
  return Object.values(LobbyLanguage).includes(language);
};
