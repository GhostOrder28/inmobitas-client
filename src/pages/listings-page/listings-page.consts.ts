import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init()

const { t } = i18next;

const LABELS = [
  t('district', { ns: "listing" }),
  t('neighborhood', { ns: "listing" }),
  t('totalArea', { ns: "listing" }) + ' ' + 'm²', 
  t('builtArea', { ns: "listing" }) + ' ' + 'm²' 
];

export {
  LABELS
}

