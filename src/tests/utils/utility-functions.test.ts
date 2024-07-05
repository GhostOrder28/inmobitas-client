import { 
  strParseIn,
  strParseOut,
  // presetSelector,
  handleValidationErrors,
} from "../../utils/utility-functions/utility-functions";
import { AxiosError } from 'axios';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        language: 'en-US'
      },
    };
  },
}));

describe('text parsing functions', () => {
  it('should lowercase all characters and replace spaces by hyphens', () => {
    const str = 'String For Test';
    expect(strParseIn(str)).toEqual('string-for-test');
  })
  it('should capitalize words and replace hyphens by spaces', () => {
    const str = 'string-for-test';
    expect(strParseOut(str)).toEqual('String For Test');
  })
})

describe('post request operations', () => {
  // it('should select the second preset from the given array of presets', () => {
  //   const presets = [
  //     {
  //       currencyTypeId: 1,
  //       currencyName: 'Peruvian Nuevo Sol',
  //       currencySymbol: 'S/'
  //     },
  //     {
  //       currencyTypeId: 2,
  //       currencyName: 'US Dollar',
  //       currencySymbol: '$'
  //     }
  //   ]
  //   expect(presetSelector(presets, 2)).toEqual({
  //     currencyTypeId: 2,
  //     currencyName: 'US Dollar',
  //     currencySymbol: '$'
  //   })
  // })
  // it('should select the validation error message from axios rejected call', () => {
  //   const errObj = { response: { data: { validationErrors: [
  //     {
  //       context: { key: 'fieldA' },
  //       message: 'abc'
  //     },
  //     { 
  //       context: { key: 'fieldB' },
  //       message: 'xyz'
  //     }
  //   ]}}}
  //   expect(formatErrorsAndSet(errObj as AxiosError, 'fieldA')).toEqual('abc')
  // })
})
