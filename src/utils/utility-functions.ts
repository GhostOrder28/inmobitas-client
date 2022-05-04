import { AxiosError, AxiosResponse } from 'axios';
import http from './axios-instance';
import { ContractPreset, CurrencyPreset, EstatePreset } from '../pages/listing-page/listing-page.types';
import { ValidationError } from '../redux/redux.types';
import { AnyAction } from 'redux';

export const strParseIn = (str: string) => {
  return str.replaceAll(' ', '-').toLowerCase();
};

export const strParseOut = (str: string) => {
  return str?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Non redux 'selectors'

export const selectValidationErrMsg = (errObj: AxiosError<{ validationErrors: ValidationError[] }> | undefined, field: string): string | undefined => {  
  const error = errObj?.response?.data.validationErrors.find (
    validationError => validationError.context.key === field
  );
  return error?.message;
};

type PresetSlice = (ContractPreset | CurrencyPreset | EstatePreset)[];

export const presetSelector = (presetSlice: PresetSlice, target: number, entity: string): string => {
  const selection = presetSlice.find(item => item[`${entity}TypeId`] === target);
  if (!selection) return 'there was an error getting the option';
  if (entity === 'currency') {
    return selection[`${entity}Symbol`] as string;
  }
  return selection[`${entity}Name`] as string;
}

export const apiCall = async (route: string, method: 'get' | 'post', body: {}): Promise<AxiosResponse | AxiosError> => {
  try {
    return await http[method](route, body)
  } catch (err) {
    return err as AxiosError
  }
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
