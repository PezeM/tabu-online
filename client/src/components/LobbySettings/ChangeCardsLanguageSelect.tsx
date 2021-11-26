import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectLobby } from '@/features/lobby/lobby.slice';
import { LobbyLanguage } from '../../../../shared/enums';
import { socketService } from '@/services/socket';
import { setIsLoading } from '@/features/settings/settings.splice';

export const ChangeCardsLanguageSelect = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectLobby).settings.language;
  const languages = Object.values(LobbyLanguage);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LobbyLanguage;

    socketService.updateLobbySettings({ language: newLanguage });
    dispatch(setIsLoading(true));
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
