import { IsAlphanumeric, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLobbyUser {
  @IsString()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(30)
  public username: string;
}

export class JoinLobbyUser extends CreateLobbyUser {
  @IsString()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(30)
  public lobbyId: string;
}
