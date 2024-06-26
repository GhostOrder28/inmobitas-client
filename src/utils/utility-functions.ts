import { ChangeEvent } from "react";
import axios, { AxiosError } from 'axios';
import http from './axios-instance';
import { ValidationError } from '../redux/redux.types';
import { AnyAction } from 'redux';
import { ItemIds } from '../components/custom-table/custom-table.types';
import { RouteSource } from './utility-types';
import { Picture } from "../components/listing-detail/listing-detail.types";
import { ContractPreset, EstatePreset } from "../pages/listing-page/listing-page.types";

export const strParseIn = (str: string) => {
  return str.replaceAll(' ', '-').toLowerCase();
};

export const strParseOut = (str: string) => {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const parseCamellCase = (str: string) => {
  const strWithSpaces = str.replace( /([A-Z])/g, " $1");
  const parsedStr = strWithSpaces.charAt(0).toUpperCase() + strWithSpaces.slice(1);
  return parsedStr;
}

export const buildRoute = (source: RouteSource, structure: string[]) => {
  if (source.original) source = source.original
  const arrayFromItemIds = Object.keys(source).filter(prop => prop.includes('Id'));
  const itemParamsIds: ItemIds = arrayFromItemIds.reduce((acc, curr) => {
    return { ...acc, [curr]: source[curr] }
  }, {});
  console.log(itemParamsIds)

  const detailUrl = structure.reduce((acc, curr) => {
    if (structure[0] === curr) return '/' + curr;
    return acc + '/' + itemParamsIds[curr]
  }, '');
  return detailUrl;
}

// this is not being used anywhere
// export const setMode = (setters: Dispatch<SetStateAction<boolean>>[], mode: boolean) => {
//   setters.forEach(s => { s(mode) })
// };

export const pictureUploader = async (
  e: ChangeEvent<HTMLInputElement>, 
  userId: number, 
  listingId: number, 
  currentPicturesLength: number,
  categoryId?: number, 
) => {
  const filesToUpload = e.target.files ? [...e.target.files] : [];
  try {
    await http.get(`/checkverified/${userId}/${listingId}/${filesToUpload.length}`);
    const uploadedFiles = await Promise.all<{ data: Picture }>(
      filesToUpload.map((file: File, idx) => {
        const newPicturePosition = currentPicturesLength + (idx + 1);

        let formData = new FormData();
        formData.append("file", file);
        formData.append("categoryId", String(categoryId));
        formData.append("position", String(newPicturePosition));

        return http.post(`/pictures/${userId}/${listingId}`, formData);
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
    if (!orderedEntities.length) throw new Error('this function need a non empty array');
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

// Non redux 'selectors'

export const selectValidationErrMsg = (errObj: AxiosError<{ validationErrors: ValidationError[] }> | undefined, field: string): string | undefined => {  
  const error = errObj?.response?.data.validationErrors.find (
    validationError => validationError.context.key === field
  );
  return error?.message;
};

type Preset = ContractPreset | EstatePreset;

export const presetSelector = <P extends Preset>(preset: P[], presetId: number): P => {
  const selection = preset.find(item => {
    const keys = Object.keys(item) as (keyof (ContractPreset | EstatePreset))[]
    const idKey = keys.find(key => (key as string).includes('Id'));    
    if (!idKey) throw Error(`object doesn't have an id property`);

    return item[idKey] === presetId;
  });

  if (!selection) throw Error(`preset not found`);

  return selection;
}

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
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
