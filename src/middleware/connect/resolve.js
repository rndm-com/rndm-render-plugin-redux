import buildState from './buildState';
import buildDispatch from './buildDispatch';

const resolve = (input) => {
  const [state, dispatch] = input;
  return [
    buildState(state),
    buildDispatch(dispatch),
  ];
};

export default resolve;
