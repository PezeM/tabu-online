import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { CardDto, GameTeamCP } from '../../../shared/dto';
import { setCurrentCard, setCurrentGameTeam, setGameState } from '@/features/game/game.slice';
import { GameState } from '@/types/game-state.enum';

export const GlobalEventsListener = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  useListenServerEvent(
    SERVER_EVENT_NAME.GameRoundExplainerPerson,
    (currentCard: CardDto, currentGameTeam: GameTeamCP) => {
      dispatch(setCurrentCard(currentCard));
      dispatch(setCurrentGameTeam(currentGameTeam));
      dispatch(setGameState(GameState.Explainer));
    },
  );

  useListenServerEvent(SERVER_EVENT_NAME.GameGuessingTeamPlayer, (gameTeamCP: GameTeamCP) => {
    dispatch(setCurrentCard(undefined));
    dispatch(setCurrentGameTeam(gameTeamCP));
    dispatch(setGameState(GameState.GuessingTeam));
  });

  useListenServerEvent(
    SERVER_EVENT_NAME.GameEnemyTeamPlayer,
    (currentCard: CardDto, enemyTeamCP: GameTeamCP) => {
      dispatch(setCurrentCard(currentCard));
      dispatch(setCurrentGameTeam(enemyTeamCP));
      dispatch(setGameState(GameState.EnemyTeam));
    },
  );

  return null;
};