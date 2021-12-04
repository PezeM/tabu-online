import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { LayoutContainer } from './components/LayoutContainer';
import { Route, Switch } from 'react-router-dom';
import { NotificationContainer } from './components/NotificationContainer';
import { BodyTextScale } from '@/components/BodyTextScale';
import { LoadingSpinnerOverlay } from '@/components/LoadingSpinnerOverlay';
import { GlobalEventsListener } from '@/components/GlobalEventsListener';
import { GameWaitingForNextRound } from '@/components/Game/GameWaitingForNextRound';
import { lazy } from 'react';

const Home = lazy(() =>
  import('@/views/home').then(module => ({ default: module.Home })),
);

const Lobby = lazy(() =>
  import('@/views/lobby').then(module => ({ default: module.Lobby })),
);

const Game = lazy(() =>
  import('@/views/game').then(module => ({ default: module.Game })),
);

const Invite = lazy(() =>
  import('@/views/invite').then(module => ({ default: module.Invite })),
);

const RouteNotFound = lazy(() =>
  import('@/views/routeNotFound').then(module => ({ default: module.RouteNotFound })),
);

export const App = () => (
  <ChakraProvider theme={theme}>
    <LoadingSpinnerOverlay />
    <GlobalEventsListener />
    <GameWaitingForNextRound />

    <LayoutContainer>
      <BodyTextScale />
      <NotificationContainer />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/lobby">
          <Lobby />
        </Route>

        <Route path="/game">
          <Game />
        </Route>

        <Route path={'/invite/:id'}>
          <Invite />
        </Route>

        <Route path="*">
          <RouteNotFound />
        </Route>
      </Switch>
    </LayoutContainer>
  </ChakraProvider>
);
