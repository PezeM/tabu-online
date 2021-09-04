import * as React from 'react';
import { ChakraProvider} from '@chakra-ui/react';
import { theme } from './styles/theme';
import { LayoutContainer } from './components/LayoutContainer';
import { Route, Switch } from 'react-router-dom';
import { Home } from './views/home';
import { NotificationContainer } from './components/NotificationContainer';
import { RouteNotFound } from './views/routeNotFound';
import { Lobby } from './views/lobby';
import { Invite } from './views/invite';
import { BodyTextScale } from '@/components/BodyTextScale';

export const App = () => (
  <ChakraProvider theme={theme}>
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
