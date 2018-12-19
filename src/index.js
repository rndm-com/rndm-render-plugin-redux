import { use } from '@rndm/render';
import middleware from './middleware';
import redux from './redux';

const plugin = {
  key: 'redux',
  middleware,
};

use(plugin);

export {
  redux,
}

export default plugin;
