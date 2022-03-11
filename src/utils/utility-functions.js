export const strParseIn = str => {
  return str.replaceAll(' ', '-').toLowerCase();
};

export const strParseOut = str => {
  return str && str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
