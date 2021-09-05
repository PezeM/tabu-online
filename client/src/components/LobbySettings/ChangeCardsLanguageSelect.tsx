import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { LobbyLanguage } from '../../../../shared/enums/lobby';
import { socket } from '@/services/socket';
import { CLIENT_EVENT_NAME } from '../../../../shared/constants/events';

export const ChangeCardsLanguageSelect = () => {
  const { t } = useTranslation();
  const currentLanguage = useAppSelector(selectLobby).settings.language;
  const languages = Object.values(LobbyLanguage);

  const changeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LobbyLanguage;

    socket.emit(CLIENT_EVENT_NAME.LobbyUpdateSettings, { language: newLanguage });
  };

  return (
    <Select value={currentLanguage} onChange={changeLanguage}>
      {languages.map(language => {
        // @ts-ignore
        const languageText = t(`ui.language.${language}`);
        return (
          <option key={language} value={language}>
            {languageText}
          </option>
        );
      })}
    </Select>
  );
};
