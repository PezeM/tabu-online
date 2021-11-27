import { LobbySettingsValidator } from '@services/validators/lobby-settings.validator';
import { Lobby } from '@models/lobby.model';
import { LobbyFixture } from '@/tests/fixtures/lobby.fixture';
import { ClientFixture } from '@/tests/fixtures/client.fixture';
import { Team } from '@shared/enums';
import { LobbySettingsValidatorException } from '@/exceptions';
import { GameFixture } from '@/tests/fixtures/game.fixture';

describe('lobby settings validator', () => {
  let lobbySettingsValidator: LobbySettingsValidator;
  let lobby: Lobby;

  beforeAll(() => {
    lobbySettingsValidator = new LobbySettingsValidator();
  });

  beforeEach(() => {
    lobby = LobbyFixture.create(ClientFixture.create(Team.Blue));
  });

  it('should throw error if lobby is started', () => {
    lobby.setNewGame(GameFixture.create([], lobby));

    expect(() => lobbySettingsValidator.validateLobbySettings(lobby)).toThrow(
      LobbySettingsValidatorException,
    );
  });

  it('should throw error if card sets are empty', () => {
    lobby.cardSets = [];

    expect(() => lobbySettingsValidator.validateLobbySettings(lobby)).toThrow(
      LobbySettingsValidatorException,
    );
  });

  it('should throw error if cards are not selected', () => {
    lobby.settings.cardIds = [];

    expect(() => lobbySettingsValidator.validateLobbySettings(lobby)).toThrow(
      LobbySettingsValidatorException,
    );
  });

  it('should throw error is members count is less than 2', () => {
    expect(() => lobbySettingsValidator.validateLobbySettings(lobby)).toThrow(
      LobbySettingsValidatorException,
    );
  });
});
