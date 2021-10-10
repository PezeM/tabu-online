import { sortPlayers } from '@utils/player.utils';
import { Player } from '@models/player.model';
import { PlayerFixture } from '@/tests/fixtures/player.fixture';
import { Team } from '@shared/enums';
import { shuffleArray } from '@shared/utils/array';

describe('player utils', () => {
  describe('sort players', () => {
    const generateRandomPlayers = (playersCount = 6) => {
      const players: Player[] = [];

      for (let i = 0; i < playersCount; i++) {
        const team = Math.random() >= 0.5 ? Team.Red : Team.Blue;
        players.push(PlayerFixture.create(team));
      }

      return players;
    };

    const generateRandomPlayersInCorrectOrder = (playersCount = 6) => {
      const players: Player[] = [];
      const lastTeam = Team.Blue;

      for (let i = 0; i < playersCount; i++) {
        const team = lastTeam === Team.Blue ? Team.Red : Team.Blue;
        players.push(PlayerFixture.create(team));
      }

      return players;
    };

    [1, 2, 5, 9, 10].map(playersCount => {
      test('it should return the same amount of players', () => {
        const players = generateRandomPlayers(playersCount);

        expect(sortPlayers(players).length).toBe(players.length);
      });
    });

    [1, 2, 5, 9, 10].map(playersCount => {
      test('it should return the same amount of players of each team', () => {
        const players = generateRandomPlayers(playersCount);
        const redPlayersCount = players.filter(p => p.team === Team.Red).length;
        const bluePlayersCount = players.filter(p => p.team === Team.Blue).length;

        const result = sortPlayers(players);

        expect(result.filter(p => p.team === Team.Red).length).toBe(redPlayersCount);
        expect(result.filter(p => p.team === Team.Blue).length).toBe(bluePlayersCount);
      });
    });

    [1, 2, 5, 9, 10].map(playersCount => {
      test('it should sort players in correct order', () => {
        const players = generateRandomPlayersInCorrectOrder(playersCount);

        expect(sortPlayers(players)).toStrictEqual(players);
      });
    });

    [1, 2, 5, 9, 10].map(playersCount => {
      test('it should sort players in correct order when they were unordered', () => {
        const players = generateRandomPlayersInCorrectOrder(playersCount);
        shuffleArray(players);

        expect(sortPlayers(players)).toStrictEqual(players);
      });
    });
  });
});
