import { useAppSelector } from '@/hooks/reduxHooks';
import { selectIsSoundMuted } from '@/features/settings/settings.splice';
import useSoundHook from 'use-sound';

type SpriteMap = {
  [key: string]: [number, number];
};

type HookOptions<T = any> = T & {
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
    ...options,
  });
};