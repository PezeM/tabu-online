import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { LayoutContainer } from './components/LayoutContainer';
import { Route, Switch } from 'react-router-dom';
import { NotificationContainer } from './components/NotificationContainer';
import { BodyTextScale } from '@/components/BodyTextScale';
import { LoadingSpinnerOverlay } from '@/components/LoadingSpinnerOverlay';
import { Game, Home, Invite, Lobby, RouteNotFound } from '@/views';
import { GlobalEventsListener } from '@/components/GlobalEventsListener';

export const App = () => (
  <ChakraProvider theme={theme}>
    <LoadingSpinnerOverlay />
    <GlobalEventsListener />

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
