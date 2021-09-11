import { LobbySettings } from '@shared/interfaces/lobby';
import { LobbyLanguage } from '@shared/enums/lobby';
import { IsIn, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { LOBBY_LANGUAGES } from '@shared/constants/lobby';

export class UpdateSettingsDto implements Partial<LobbySettings> {
  @Length(2, 3, {
    message: 'error.wrongLanguage',
  })
  @IsString({
    message: 'error.wrongType',
  })
  @IsIn(LOBBY_LANGUAGES, {
    message: 'error.languageNotSupported',
  })
  language?: LobbyLanguage;

  @IsInt({
    message: 'error.notAnInt',
  })
  @Min(2, {
    message: 'error.minLength',
  })
  @Max(14, {
    message: 'error.maxLength',
  })
  maxPlayers?: number;

  @IsInt({
    message: 'error.notAnInt',
  })
  @Min(0, {
    message: 'error.minLength',
  })
  maximumNumberOfSkips?: number;

  @IsInt({
    message: 'error.notAnInt',
  })
  @Min(1, {
    message: 'error.minLength',
  })
  pointsToWin?: number;

  @IsInt({
    message: 'error.notAnInt',
  })
  @Min(10 * 1000, {
    message: 'error.minLength',
  })
  @Max(10 * 60 * 1000, {
    message: 'error.maxLength',
  })
  roundTime?: number;
}
