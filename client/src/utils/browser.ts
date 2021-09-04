type BrowserLocalesOptions = {
  languageCodeOnly?: boolean;
};

export const getBrowserLocales = (options: BrowserLocalesOptions = {}): string[] | undefined => {
  const defaultOptions = {
    languageCodeOnly: false,
  };

  const opt = {
    ...defaultOptions,
    ...options,
  };

  const browserLocales =
    navigator.languages === undefined ? [navigator.language] : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();

    return opt.languageCodeOnly ? getLanguageCodeOnly(trimmedLocale) : trimmedLocale;
  });
};

/**
 * Gets current browser language
 * @param {BrowserLocalesOptions} options
 * @returns {string} Returns language code of the browser, defaults to "en"
 */
export const getBrowserLanguage = (options: BrowserLocalesOptions = { languageCodeOnly: true }) => {
  const browserLocales = getBrowserLocales(options);
  return browserLocales ? browserLocales[0] : 'en';
};

/**
 * Returns only language code, ex from pl-PL will return only pl
 * @param {string} language
 * @returns {string} Only language code
 */
export const getLanguageCodeOnly = (language: string) => language.split(/-|_/)[0];