import { useListenServerEvent } from '@/hooks/useListenServerEvent';
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { CardDto, GameTeamCP } from '../../../shared/dto';
import { setCurrentCard, setGameState, setGameTeam } from '@/features/game/game.slice';
import { GameState } from '@/types/game-state.enum';

export const GlobalEventsListener = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  useListenServerEvent(SERVER_EVENT_NAME.GameRoundExplainerPerson, (currentCard: CardDto) => {
    dispatch(setCurrentCard(currentCard));
    dispatch(setGameState(GameState.Explainer));
  });

  useListenServerEvent(SERVER_EVENT_NAME.GameGuessingTeamPlayer, () => {
    dispatch(setCurrentCard(undefined));
    dispatch(setGameState(GameState.GuessingTeam));
  });

  useListenServerEvent(SERVER_EVENT_NAME.GameEnemyTeamPlayer, (currentCard: CardDto) => {
    dispatch(setCurrentCard(currentCard));
    dispatch(setGameState(GameState.EnemyTeam));
  });

  useListenServerEvent(SERVER_EVENT_NAME.GameUpdateGameTeam, (gameTeam: GameTeamCP) => {
    dispatch(setGameTeam(gameTeam));
  });

  useListenServerEvent(SERVER_EVENT_NAME.GameRoundEnded, () => {
    dispatch(setCurrentCard(undefined));
    dispatch(setGameState(GameState.WaitingForNextRound));
  });

  return null;
};