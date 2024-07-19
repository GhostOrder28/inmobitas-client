import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import listingTranslationEN from "./locale/en/listing.translation.en.json";
import clientTranslationEN from "./locale/en/client.translation.en.json";
import uiTranslationEN from "./locale/en/ui.translation.en.json";
import listingTranslationES from "./locale/es/listing.translation.es.json";
import clientTranslationES from "./locale/es/client.translation.es.json";
import uiTranslationES from "./locale/es/ui.translation.es.json";
import agendaTranslationEN from "./locale/en/agenda.translation.en.json";
import agendaTranslationES from "./locale/es/agenda.translation.es.json";
import errorTranslationEN from "./locale/en/error.translation.en.json";
import errorTranslationES from "./locale/es/error.translation.es.json";

const resources = {
  en: {
    listing: listingTranslationEN,
    client: clientTranslationEN,
    ui: uiTranslationEN,
    agenda: agendaTranslationEN, 
    error: errorTranslationEN, 
  },
  es: {
    listing: listingTranslationES,
    client: clientTranslationES,
    ui: uiTranslationES,
    agenda: agendaTranslationES,
    error: errorTranslationES, 
  }
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: navigator.language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n;
