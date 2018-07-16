import { set } from 'lodash';

const buildDispatch = (input = []) => (
  input.reduce((o, { prop, action }) => {
    const output = {...o};
    set(output, prop, () => action);
    return output;
  }, {})
);

export default buildDispatch;
