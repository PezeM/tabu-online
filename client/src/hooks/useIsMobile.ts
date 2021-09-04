import { useBreakpointValue } from '@chakra-ui/react';
import { mobileBreakpoints } from '@/styles/theme';

export const useIsMobile = (): boolean => {
  const isMobile = useBreakpointValue(mobileBreakpoints);

  return !!isMobile;
};