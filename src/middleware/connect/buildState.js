import { get, set } from 'lodash';

const buildState = (input = []) => (state) => (
  !Array.isArray(input) ? null :
  input.reduce((o, { from, to, default: value = null } = {}) => {
    const output = {...o};
    set(output, to, get(state, from, value));
    return output;
  }, {})
);

export default buildState;
