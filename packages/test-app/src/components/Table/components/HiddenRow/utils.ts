export const isFieldsEqual = (state: {[key: string]: string}, props: {[key: string]: string}): boolean => {
  let isEqual: boolean = true;
  Object.keys(state).forEach(stateField => {
    if (!isEqual) return;
    if (state[stateField] !== props[stateField]) {
      isEqual = false;
    }
  });

  return isEqual;
}