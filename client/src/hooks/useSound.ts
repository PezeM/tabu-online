import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsSoundMuted } from '@/features/settings/settingsSlice';
import useSoundHook from 'use-sound';

type SpriteMap = {
  [key: string]: [number, number];
};

type HookOptions = {
  id?: string;
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  sprite?: SpriteMap;
  onload?: () => void;
};

export const useSound = (src: string | string[], options?: HookOptions) => {
  const isMuted = useAppSelector(selectIsSoundMuted);

  return useSoundHook(src, {
    soundEnabled: !isMuted,
    volume: 0.6,
    ...options,
  });
};
