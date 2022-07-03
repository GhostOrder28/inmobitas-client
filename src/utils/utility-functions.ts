import { AxiosError, AxiosResponse } from 'axios';
import http from './axios-instance';
import { ContractPreset, CurrencyPreset, EstatePreset } from '../pages/listing-page/listing-page.types';
import { ValidationError } from '../redux/redux.types';
import { AnyAction } from 'redux';
import i18next from 'i18next';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';

export const strParseIn = (str: string) => {
  return str.replaceAll(' ', '-').toLowerCase();
};

export const strParseOut = (str: string) => {
  return str?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const capFirst = (str: string) => {
  return `${str?.charAt(0).toUpperCase()}${str?.substring(1)}`
}

// Non redux 'selectors'

export const selectValidationErrMsg = (errObj: AxiosError<{ validationErrors: ValidationError[] }> | undefined, field: string): string | undefined => {  
  const error = errObj?.response?.data.validationErrors.find (
    validationError => validationError.context.key === field
  );
  return error?.message;
};

type PresetSlice = (ContractPreset | CurrencyPreset | EstatePreset)[];

export const presetSelector = (presetSlice: PresetSlice, target: number): ContractPreset | CurrencyPreset | EstatePreset | undefined => {

  const selection = presetSlice.find(item => {
    const id = Object.keys(item).find(key => key.includes('Id'));    
    console.log(id);    
    return id ? item[id] === target : new Error(`object doesn't have an id property`);
  });

  return selection;
}

export const listingIdSelector = (pathname: string) => {
  return pathname.substring(pathname.lastIndexOf('/')+1); 
}

export const apiCall = async (route: string, method: 'get' | 'post', body: {}): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http[method](route, body)
  } catch (err) {
    return err as AxiosError
  }
}

export const getLocale = () => {
  const locale = i18next.language.includes('en') ? enUS : es;
  return locale;
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
