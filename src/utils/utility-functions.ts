import { AxiosError } from 'axios';
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

export const presetSelector = (presetSlice: PresetSlice, target: number): ContractPreset | CurrencyPreset | EstatePreset | undefined => {

  const selection = presetSlice.find(item => {
    const id = Object.keys(item).find(key => key.includes('Id'));    
    return id ? item[id] === target : new Error(`object doesn't have an id property`);
  });

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
