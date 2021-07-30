import { useToast } from "@chakra-ui/react";
import { useListenServerEvent } from "@/hooks/useListenServerEvent";
import { SERVER_EVENT_NAME } from "../../../shared/constants/events";
import { NotificationVariation } from "../../../shared/notification";
import i18n from "../i18n";

export const NotificationContainer = (): JSX.Element | null => {
  const toast = useToast();

  useListenServerEvent(
    SERVER_EVENT_NAME.Notification,
    (message: string, variation: NotificationVariation) => {
      message = i18n.t(message);

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
