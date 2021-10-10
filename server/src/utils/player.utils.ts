import { Player } from '@models/player.model';
import { Team } from '@shared/enums';

export function sortPlayers(players: Player[]) {
  const teamRedPlayers = players.filter(p => p.team === Team.Red);
  const teamBluePlayers = players.filter(p => p.team === Team.Blue);

  const highestNumberOfPlayersInTeam = Math.max(teamBluePlayers.length, teamRedPlayers.length);

  const sortedPlayers: Player[] = [];

  for (let i = 0; i < highestNumberOfPlayersInTeam; i++) {
    const redPlayer = teamRedPlayers[i];
    const bluePlayer = teamBluePlayers[i];

    if (redPlayer) sortedPlayers.push(redPlayer);
    if (bluePlayer) sortedPlayers.push(bluePlayer);
  }

  return sortedPlayers;
}
