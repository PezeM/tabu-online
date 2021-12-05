import React from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectIsSoundMuted, toggleIsSoundMuted } from '@/features/settings/settingsSlice';
import { useSoundModeValue } from '@/hooks/useSoundModeValue';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import enableSound from '@/assets/sounds/enable-sound.mp3';
import disableSound from '@/assets/sounds/disable-sound.mp3';

const iconVariants = {
  animate: {
    rotate: [-9, 9, 0],
    transition: {
      repeat: 1,
      duration: 0.25,
    },
  },
  stop: { rotate: 0 },
};

const firstPath = {
  animate: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.25,
    },
  },
  stop: {
    opacity: 0,
    transition: {
      delay: 0.15,
      duration: 0.25,
    },
  },
};

const secondPath = {
  animate: {
    opacity: 1,
    transition: {
      delay: 0.15,
      duration: 0.25,
    },
  },
  stop: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

const MotionButton = motion<IconButtonProps>(IconButton);

export const ToggleSoundsButton = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isSoundMuted = useAppSelector(selectIsSoundMuted);
  const [playOnMute] = useSound(disableSound);
  const [playOnUnmute] = useSound(enableSound);

  const text = useSoundModeValue(t('ui.muteSounds'), t('ui.unmuteSounds'));

  const toggleSound = () => {
    if (isSoundMuted) {
      playOnUnmute({ forceSoundEnabled: true });
    } else {
      playOnMute();
    }

    dispatch(toggleIsSoundMuted());
  };

  return (
    <Tooltip label={text} aria-label={text}>
      <MotionButton
        onClick={toggleSound}
        _hover={{
          opacity: 1,
        }}
        _focus={{
          opacity: 1,
        }}
        opacity={0.85}
        size="lg"
        fontSize="lg"
        aria-label={text}
        variant="ghost"
        color="current"
      >
        <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <motion.path
            stroke="currentColor"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M8.25 3.75L4.5 6.75H1.5V11.25H4.5L8.25 14.25V3.75Z"
            variants={iconVariants}
            animate={isSoundMuted ? 'stop' : 'animate'}
            initial={false}
          />
          <motion.path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11.655 6.34501
            C12.358 7.04824 12.753 8.00189 12.753 8.99626
            C12.753 9.99063 12.358 10.9443 11.655 11.6475"
            variants={firstPath}
            animate={isSoundMuted ? 'stop' : 'animate'}
          />
          <motion.path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M14.3025 3.69751
            C15.7086 5.10397 16.4984 7.01128 16.4984 9.00001
            C16.4984 10.9887 15.7086 12.8961 14.3025 14.3025"
            variants={secondPath}
            animate={isSoundMuted ? 'stop' : 'animate'}
          />
        </motion.svg>
      </MotionButton>
    </Tooltip>
  );
});
