import { LobbyKeys } from '@shared/interfaces/lobby';
import { ClassConstructor } from '@shared/types';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { SettingsHandler } from '@services/settingsHandlers/settings.handler';

export function ForEvent(key: LobbyKeys) {
  return (constructor: ClassConstructor<BaseSettingsHandler<LobbyKeys>>): void => {
    SettingsHandler.set(key, constructor);
  };
}
