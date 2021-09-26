import i18n from '@/i18n';
import { useToast, UseToastOptions } from '@chakra-ui/react';

type ToastType = ReturnType<typeof useToast>;

export const showNotification = (toast: ToastType, msg: string, options?: UseToastOptions) => {
  toast({
    description: i18n.t(msg),
    position: 'top-right',
    variant: 'subtle',
    duration: 5000,
    isClosable: true,
    ...options
  });
};

type StatusToastOptions = Omit<UseToastOptions, 'status'>;

export const showErrorNotification = (toast: ToastType, msg: string, options?: StatusToastOptions) =>
  showNotification(toast, msg, {
    ...options,
    status: 'error'
  });

export const showSuccessNotification = (toast: ToastType, msg: string, options?: StatusToastOptions) =>
  showNotification(toast, msg, {
    ...options,
    status: 'success'
  });