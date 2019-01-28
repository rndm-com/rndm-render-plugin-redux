import { render } from '@rndm/render';
import { get, set } from 'lodash';

const buildState = (input = []) => (state) => (
    !Array.isArray(input) ? null :
        input.reduce((o, { from, to, default: value = null } = {}) => {
            const output = {...o};
            const rTo = render(to, 'RNDM.functionChain', { state });
            const rFrom = render(from, 'RNDM.functionChain', { state });
            const rDefault = render(value, 'RNDM.functionChain', { state });
            set(output, rTo, get(state, rFrom, rDefault));
            return output;
        }, {})
);

export default buildState;
