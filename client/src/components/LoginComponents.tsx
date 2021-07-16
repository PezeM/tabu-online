import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  isLoading?: boolean;
  onSubmit: (username: string) => void;
}

export const LoginComponent = ({ onSubmit, isLoading }: Props) => {
  const [username, setUsername] = useState("");

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box>
        <Box p={4} textAlign="left" maxWidth={"30em"}>
          <form onSubmit={onFormSubmit}>
            <FormControl id="username" isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="Username..."
                onChange={(e) => setUsername(e.currentTarget.value)}
              />

              <Button
                mt={4}
                colorScheme="teal"
                width={"full"}
                type="submit"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
