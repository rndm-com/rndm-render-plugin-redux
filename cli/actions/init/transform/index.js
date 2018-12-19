const importReactRedux = require('./importReactRedux');
const importStore = require('./importStore');
const addJSXProvider = require('./addJSXProvider');

const transform = (input) => {
  importReactRedux(input);
  importStore(input);
  addJSXProvider(input);
};

module.exports = transform;
