import axios from 'axios';

export const strParseIn = str => {
  return str.replaceAll(' ', '-').toLowerCase();
};

export const strParseOut = str => {
  return str && str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Non redux 'selectors'

export const selectErrMsg = (errObj, field) => {
  if (errObj) {
    const error = errObj.response.data.validationErrors.find(errObj => errObj.context.key === field);
    if (error) return error.message;
  } else {
    return null;
  }
};
