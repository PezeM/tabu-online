import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguageCodeOnly } from '@/utils/browser';
import { Select } from '@chakra-ui/react';

export const ChangeLanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = getLanguageCodeOnly(i18n.language);

  const languages = useMemo(() => {
    console.log('Changing languages');
    return Array.from(
      new Set(
        i18n.languages
          .map(getLanguageCodeOnly)
          .sort((a, b) => a.localeCompare(b, currentLanguage, { sensitivity: 'base' })),
      ),
    );
  }, [i18n.languages]);

  const changeLanguage = async (e: any) => {
    await i18n.changeLanguage(e.target.value);
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
