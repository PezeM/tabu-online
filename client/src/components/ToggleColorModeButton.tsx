import React from 'react';
import { Button, chakra, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// transformed from https://codepen.io/aaroniker/pen/KGpXZo

export const ToggleColorModeButton = () => {
  const { t } = useTranslation();

  const { colorMode, toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue('#1A202C', '#CBD5E0');
  const text = useColorModeValue(t('ui.switchToDarkMode'), t('ui.switchToLightMode'));

  return (
    <Tooltip label={text} aria-label={text}>
      <Button
        onClick={toggleColorMode}
        _hover={{
          opacity: 1,
        }}
        _focus={{
          opacity: 1,
        }}
        aria-label={text}
        size="lg"
        fontSize="lg"
        opacity={0.85}
        position={'relative'}
        borderRadius={'5px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'opacity 0.3s ease'}
        border={'none'}
        outline={'none'}
        background={'none'}
        cursor={'pointer'}
        padding={0}
        appearance={'none'}
      >
        <chakra.div
          position={'absolute'}
          width={'36px'}
          height={'36px'}
          borderRadius={'50%'}
          border={colorMode === 'dark' ? `4px solid ${buttonColor}` : 'none'}
          backgroundColor={colorMode === 'dark' ? buttonColor : 'transparent'}
          transform={colorMode === 'dark' ? 'scale(0.55)' : 'scale(1) rotate(-2deg)'}
          transition={'all 0.45s ease'}
          overflow={colorMode === 'dark' ? 'visible' : 'hidden'}
          boxShadow={colorMode === 'dark' ? 'none' : `inset 16px -16px 0px 0px ${buttonColor}`}
          _before={{
            content: `""`,
            position: `absolute`,
            right: `-9px`,
            top: `-9px`,
            height: `inherit`,
            width: `inherit`,
            border: colorMode === 'dark' ? `2px solid ${buttonColor}` : 'none',
            borderRadius: `50%`,
            opacity: colorMode === 'dark' ? 0 : 1,
            transform: colorMode === 'dark' ? `translate(14px, -14px)` : `translate(0, 0)`,
            transition: `transform 0.45s ease`,
          }}
          _after={{
            content: `""`,
            width: `8px`,
            height: `8px`,
            borderRadius: `50%`,
            margin: `-4px 0 0 -4px`,
            position: `absolute`,
            top: `50%`,
            left: `50%`,
            boxShadow: `0 -26px 0 ${buttonColor}, 0 26px 0 ${buttonColor}, 26px 0 0 ${buttonColor}, -26px 0 0 ${buttonColor}, 18px 18px 0 ${buttonColor}, -18px 18px 0 ${buttonColor}, 18px -18px 0 ${buttonColor}, -18px -18px 0 ${buttonColor}`,
            transform: colorMode === 'dark' ? `scale(1)` : `scale(0)`,
            transition: `all 0.35s ease`,
          }}
        />
      </Button>
    </Tooltip>
  );
};
