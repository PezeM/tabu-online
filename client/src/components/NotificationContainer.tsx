import { useToast } from "@chakra-ui/react";
import { useListenServerEvent } from "@/hooks/useListenServerEvent";
import { SERVER_EVENT_NAME } from '../../../shared/constants';
import { NotificationVariation } from "../../../shared/notification";
import i18n from "../i18n";
import { showNotification } from '@/utils/notification';

export const NotificationContainer = (): JSX.Element | null => {
  const toast = useToast();

  useListenServerEvent(
    SERVER_EVENT_NAME.Notification,
    (message: string, variation: NotificationVariation) => {
      message = i18n.t(message);

      showNotification(toast, message, { status: variation });
    }
  );

  return null;
};
