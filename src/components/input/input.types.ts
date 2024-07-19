import { UseFormRegister, Control } from "react-hook-form";
import { Client } from "../../pages/client-page/client-page.types";
import { Listing } from "../../pages/listing-page/listing-page.types";
import { FormErrors } from "../../types/global.types";
import { SignInData, SignUpData } from "../../components/user-auth/user-auth.types";
import { AgendaEvent } from "../../pages/agenda-page/agenda-page.types";
import { GalleryCategoryForm } from "../../components/photo-gallery/sub-components/gallery-category/gallery-category.types";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "date" | "time" | "password";
type FieldName = keyof (Client & Listing & SignInData & SignUpData & AgendaEvent & GalleryCategoryForm);
export type FieldNameWithoutAuth = Exclude<FieldName, keyof SignInData | keyof SignUpData>;

type EvergreenInputProps = {
  border: string;
  backgroundColor: string;
  autoFocus: boolean;
}

export type InputProps ={
  name: FieldName;
  type: FieldType;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors?: FormErrors
  selectOptions?: any[];
  optionLabelKey?: string;
  optionValueKey?: string;
  control?: Control<any, any>;
  valueAsNumber?: boolean;
} & Partial<EvergreenInputProps>;
