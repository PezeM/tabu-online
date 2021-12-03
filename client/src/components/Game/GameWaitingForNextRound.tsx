import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Box, Button, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { selectGameState, selectIsInGame } from '@/features/game/game.slice';
import { GameState } from '@/types/game-state.enum';
import { useTranslation } from 'react-i18next';
import { socketService } from '@/services/socket.service';

export const GameWaitingForNextRound = () => {
  const [isLoading, setIsLoading] = useState(false);
  const gameState = useAppSelector(selectGameState);
  const isInGame = useAppSelector(selectIsInGame);
  const bgColor = useColorModeValue('rgba(20, 20, 20, 0.1)', 'rgba(220, 220, 220, 0.1)');
  const boxBgColor = useColorModeValue('gray.300', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  const { t } = useTranslation();

  const startNewRound = () => {
    socketService.gameStartNextRound();
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [gameState]);

  if (gameState !== GameState.WaitingForNextRound || !isInGame) {
    return null;
  }

  return (
    <Box
      h="100vh"
      w="100vw"
      position={'absolute'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      px={[2, 4, 8, 16, 32]}
      py={[1, 2]}
      zIndex={'100'}
    >
      <Flex
        margin="0 auto"
        direction="row"
        maxW="1250px"
        maxH={['95%', '93%', '90%']}
        my={[8, 10, 16, 24]}
        width={'100%'}
        flex={'1 0 auto'}
        boxShadow={'xl'}
        rounded={'md'}
        border={'1px'}
        borderColor={'gray.600'}
        borderRadius={'md'}
        backgroundColor={bgColor}
        backdropFilter={'blur(1px)'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex
          justifyContent={'space-evenly'}
          alignItems={'center'}
          width={'100%'}
          height={'50%'}
          direction={'column'}
        >
          <Heading size={'xl'} color={textColor}>{t('ui.roundHasEnded')}</Heading>
          <Box borderRadius={'xl'} p={[4, 8, 16]} bg={boxBgColor} boxShadow={'lg'}>
            <Button
              isLoading={isLoading}
              size={'lg'}
              colorScheme={'blue'}
              boxShadow={'md'}
              onClick={startNewRound}
            >
              {t('ui.startNewRound')}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
