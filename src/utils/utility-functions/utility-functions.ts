import { ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import http from "../../http/http";
import { ValidationError } from "../../http/http.types";
import { AnyAction } from "redux";
import { ItemIds } from "../../components/custom-table/custom-table.types";
import { RouteSource, Uncertain } from "../utility-types";
import { Picture } from "../../components/listing-info/listing-info.types";
import { ContractPreset, EstatePreset } from "../../pages/listing-page/listing-page.types";
import { FormState, UseFormSetError, FieldErrors } from "react-hook-form";
import { Matchable, FormattedError, Preset } from "./utility-functions.type";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

export const strParseIn = (str: string) => {
  return str.replaceAll(" ", '-').toLowerCase();
};

export const strParseOut = (str: string) => {
  return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const parseCamellCase = (str: string) => {
  const strWithSpaces = str.replace( /([A-Z])/g, " $1");
  const parsedStr = strWithSpaces.charAt(0).toUpperCase() + strWithSpaces.slice(1);
  return parsedStr;
}

export const getPathLastFragment = (pathname: string) => {
  const fragments = pathname.split("/");
  return fragments[fragments.length - 1];
}

// this is not being used anywhere
// export const setMode = (setters: Dispatch<SetStateAction<boolean>>[], mode: boolean) => {
//   setters.forEach(s => { s(mode) })
// };

export const pictureUploader = async (
  e: ChangeEvent<HTMLInputElement>, 
  estateId: number, 
  currentPicturesLength: number,
  categoryId?: number, 
) => {
  const filesToUpload = e.target.files ? [...e.target.files] : [];
  try {
    const userId = selectCurrentUserId(store.getState());
    await http.get(`/checkverified/${userId}/${estateId}/${filesToUpload.length}`);
    const uploadedFiles = await Promise.all<{ data: Picture }>(
      filesToUpload.map((file: File, idx) => {
        const newPicturePosition = currentPicturesLength + (idx + 1);

        let formData = new FormData();
        formData.append("file", file);
        formData.append("categoryId", String(categoryId));
        formData.append("position", String(newPicturePosition));

        return http.post(`/pictures/${userId}/${estateId}`, formData);
      })
    );
    const newPictures = uploadedFiles.map((file) => file.data);
    return newPictures
  } catch (err) {
    if (axios.isAxiosError(err)) throw err;
  }
};

export const checkPositions = <O extends { [key: string]: any }>(orderedEntities: O[], key: string) => {
  try {
    if (!orderedEntities.length) throw new Error("this function need a non empty array");
    const checkedEntities = orderedEntities.map((ent, idx) => {
      return ent[key] === idx + 1 ? true : false;
    })

    const positionsAreCorrect = !checkedEntities.some(ent => ent === false);
    return positionsAreCorrect;
  } catch (err) {
    console.error(err)
  }
};

export function sortEntities <O extends { [key: string]: any }>(arr: O[], key: string) {
  const clonedArr = [ ...arr ];
  clonedArr.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0
  })
  return clonedArr;
};

export function handleValidationErrors <F>(formData: Uncertain<F>, rawErrors: ValidationError[], setter: UseFormSetError<F>): void 
export function handleValidationErrors <F>(formData: Uncertain<F>, rawErrors: ValidationError[]): FormattedError[]
export function handleValidationErrors <F>(formData: Uncertain<F>, rawErrors: ValidationError[], setter?: UseFormSetError<F>): FormattedError[] | void {
  const errors = rawErrors.map(r => ({
    name: r.context.key,
    error: r.message
  }));

  if (setter) {
    const formKeys = Object.keys(formData) as (keyof F)[];

    for (const key of formKeys) {
      const currentError = errors!!.find(r => r.name === key);

      if (currentError) {
        setter(`root.${key}`, { message: currentError.error })
      };
    }
  } else {
    console.log(errors);
    return errors;
  };
}

export const presetSelector = <P extends Preset>(preset: P[], presetId: number): P => {
  const selection = preset.find(item => {
    const keys = Object.keys(item) as (keyof (ContractPreset | EstatePreset))[]
    const idKey = keys.find(key => (key as string).includes("Id"));    
    if (!idKey) throw Error(`object doesn"t have an id property`);

    return item[idKey] === presetId;
  });

  if (!selection) throw Error(`preset not found`);

  return selection;
}

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>
export function withMatcher(actionCreator: Function){
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
}
