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

    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
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
