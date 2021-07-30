import * as React from 'react';
import { Box, ChakraProvider, Code, Grid, Link, Text, VStack } from '@chakra-ui/react';
import { Logo } from './Logo';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { theme } from './styles/theme';
import { LayoutContainer } from './components/LayoutContainer';
import { Route, Switch } from 'react-router-dom';
import { Home } from './views/home';
import { NotificationContainer } from './components/NotificationContainer';
import { RouteNotFound } from './views/routeNotFound';
import { Lobby } from './views/lobby';
import { Invite } from './views/invite';

export const App = () => (
  <ChakraProvider theme={theme}>
    <LayoutContainer>
      <NotificationContainer />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/test">
          <Box h={'100%'} textAlign="center" fontSize="xl">
            <Grid h={'100%'} p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Text>
                  Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
                </Text>
                <Link
                  color="teal.500"
                  href="https://chakra-ui.com"
                  fontSize="2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn Chakra
                </Link>
              </VStack>
            </Grid>
          </Box>
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
