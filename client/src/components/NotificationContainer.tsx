import React from "react";
import { useToast } from "@chakra-ui/react";
import { useListenServerEvent } from "../hooks/useListenServerEvent";
import { SERVER_EVENT_NAME } from "../../../shared/constants/events";
import { NotificationVariation } from "../../../shared/notification";

export const NotificationContainer = (): JSX.Element | null => {
  const toast = useToast();

  useListenServerEvent(
    SERVER_EVENT_NAME.Notification,
    (message: string, variation: NotificationVariation) => {
      toast({
        description: message,
        position: "top-right",
        variant: variation,
        isClosable: true,
        duration: 5000,
      });
    }
  );

  return null;
};
