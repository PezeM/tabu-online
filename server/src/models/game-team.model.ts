import { Team } from '@shared/enums';
import { Player } from '@models/player.model';

export class GameTeam {
  public numberOfSkips: number;
  public points: number;

  constructor(public team: Team, public players: Player[]) {
    this.points = 0;
    this.numberOfSkips = 0;
  }
}
