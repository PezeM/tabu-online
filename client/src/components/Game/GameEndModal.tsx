import React from 'react';
import {
  Button,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectPlayerStats } from '@/features/game/game.slice';
import { RepeatIcon } from '@chakra-ui/icons';
import { CardIcon, TeamIcon } from '@/styles/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GameEndModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const playerStats = useAppSelector(selectPlayerStats);
  const headerColor = useColorModeValue('gray.700', 'gray.300');
  const statsBg = useColorModeValue('gray.200', 'gray.800');
  const statColor = useColorModeValue('gray.600', 'gray.300');

  if (!playerStats) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered={true}
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('ui.gameFinish')}</ModalHeader>
        <ModalBody display={'flex'} flexDirection={'column'}>
          <Heading size={'md'} mb={[2, 3, 4]} textAlign={'center'} color={headerColor}>
            {t('ui.yourStats')}
          </Heading>
          <Grid
            templateColumns={'6fr 7fr'}
            templateRows={'repeat(3, 1fr)'}
            p={[2, 4, 6]}
            gridRowGap={2}
            bg={statsBg}
            borderRadius={'xl'}
            boxShadow={'xl'}
            alignItems={'center'}
          >
            <Flex flexDirection={'row'} alignItems={'center'}>
              <TeamIcon w={[4, 5]} h={[4, 5]} />
              <Text ml={[2, 4]} fontWeight={'600'}>
                {t('ui.team.name')}
              </Text>
            </Flex>

            <Text color={statColor}>{t(`ui.team.${playerStats.team}`)}</Text>

            <Flex flexDirection={'row'} alignItems={'center'}>
              <RepeatIcon w={[4, 5]} h={[4, 5]} />
              <Text ml={[2, 4]} fontWeight={'600'}>
                {t('ui.numberOfSkips')}
              </Text>
            </Flex>

            <Text color={statColor}>{playerStats.numberOfSkips}</Text>

            <Flex flexDirection={'row'} alignItems={'center'}>
              <CardIcon w={[4, 5]} h={[4, 5]} />
              <Text ml={[2, 4]} fontWeight={'600'}>
                {t('ui.timesShowingCard')}
              </Text>
            </Flex>

            <Text color={statColor}>{playerStats.timesShowingCard}</Text>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {t('ui.returnToLobby')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
