import { set,  } from 'lodash';
import { render } from '@rndm/render';

const buildDispatch = (input = []) => (
  input.reduce((o, { prop, action }) => {
    const output = {...o};
    set(output, render(prop), (...args) => {
      return Object.keys(action).reduce((o,i) => {
        const value = render(action[i], 'RNDM.functionChain', { args });
        return ({ ...o, [i]: value })
      }, {});
    });
    return output;
  }, {})
);

export default buildDispatch;
