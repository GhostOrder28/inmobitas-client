import testingActionTypes from './testing.types';

export const onTest = text => ({
  type: testingActionTypes.ON_TEST,
  payload: text
})
