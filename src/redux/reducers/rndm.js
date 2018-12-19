const initial = {};

const reducer = (state = initial, { type = '', ...action } = {}) => {
  if (type.startsWith('RNDM_')) {
    return { ...state, ...action };
  }else {
    return state;
  }
};

export default reducer;
