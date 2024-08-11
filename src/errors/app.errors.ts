import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init()

const { t } = i18next;

export class UploadError extends Error {
  suggestion: string;

  constructor(message: string) {
    super(message);
    this.name = "UploadError";
    this.suggestion = t("contactTheAdmin", { ns: "error" })
  }
}
