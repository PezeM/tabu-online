import { LobbyKeys } from '@shared/interfaces/lobby';
import { SettingsHandler } from '@services/settingsHandlers/settings.handler';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ClassConstructor } from '@shared/types';

export function ForEvent(key: LobbyKeys) {
  return (constructor: ClassConstructor<BaseSettingsHandler>): void => {
    SettingsHandler.set(key, constructor);
  };
}
