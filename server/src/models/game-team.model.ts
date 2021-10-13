import { Team } from '@shared/enums';
import { Player } from '@models/player.model';
import { ClientPayload } from '@shared/interfaces';
import { GameTeamCP } from '@shared/dto';

export class GameTeam implements ClientPayload<GameTeamCP> {
  public numberOfSkips: number;
  public points: number;

  constructor(public team: Team, public players: Player[]) {
    this.points = 0;
    this.numberOfSkips = 0;
  }

  public getCP(): GameTeamCP {
    return {
      team: this.team,
      points: this.points,
      numberOfSkips: this.numberOfSkips,
    };
  }
}
