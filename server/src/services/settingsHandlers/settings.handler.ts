import { LobbyKeys } from '@shared/interfaces/lobby';
import { BaseSettingsHandler } from '@services/settingsHandlers/base-settings.handler';
import { ClassConstructor } from '@shared/types';

export class SettingsHandler {
  private static handlers = {};

  public static set(key: LobbyKeys, constructor: ClassConstructor<BaseSettingsHandler>) {
    SettingsHandler.handlers[key] = constructor;
  }

  public static get(key: LobbyKeys): ClassConstructor<BaseSettingsHandler> | undefined {
    return SettingsHandler.handlers[key];
  }
}
