import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { theme } from "./styles/theme";
import { LayoutContainer } from "./components/LayoutContainer";
import { Switch, Route } from "react-router-dom";
import { Home } from "./views/home";
import { NotificationContainer } from "./components/NotificationContainer";

export const App = () => (
  <ChakraProvider theme={theme}>
    <LayoutContainer>
      <NotificationContainer />

      <Switch>
        <Route path="/lobby">
          <Box h={"100%"} textAlign="center" fontSize="xl">
            <Grid h={"100%"} p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Text>
                  Edit <Code fontSize="xl">src/App.tsx</Code> and save to
                  reload.
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

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </LayoutContainer>
  </ChakraProvider>
);
