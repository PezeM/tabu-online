import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import useTimeout from "../../hooks/useTimeout";

interface Props {
  delay: number;
  page?: string;
}

export const LobbySkeleton = ({ delay, page }: Props) => {
  const history = useHistory();

  const changePage = () => {
    if (page) {
      history.push(page);
    }
  };

  useTimeout(changePage, delay);

  return (
    <Stack height={"full"} spacing={4} align="stretch">
      <Skeleton height={"full"} />
      <Skeleton height={"full"} />
      <Skeleton height={"full"} />
    </Stack>
  );
};
