import * as Localization from "expo-localization";
import i18n from "i18n-js";

import hr from "./languages/hr";
import en from "./languages/en";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: en,
  hr: hr
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export const localization = (translationItem) => {
  return i18n.t(translationItem);
};
