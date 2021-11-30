import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsSoundMuted } from '@/features/settings/settingsSlice';

/**
 * Change value based on if sound is muted
 *
 * @param unmuted the unmuted mode value
 * @param muted the muted mode value
 */
export const useSoundModeValue = <TUnmuted, TMuted>(unmuted: TUnmuted, muted: TMuted) => {
  const isSoundMuted = useAppSelector(selectIsSoundMuted);

  return isSoundMuted ? muted : unmuted;
};
