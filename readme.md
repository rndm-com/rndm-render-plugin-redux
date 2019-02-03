# [RNDM](https://www.rndm.com) Render Plugin: Redux

## About

This plugin provides functionality for [RNDM Render package](https://www.rndm.com/docs/rndm-render) when integrating Redux for state management.

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://www.rndm.com/docs/rndm-render) and [RNDM Preset: Core](https://www.rndm.com/docs/rndm-render/preset/core) package.

### Required Dependencies

You will need to install the following dependencies, you have not already done so through other packages:

- react
- react-art
- react-dom
- react-native

This can be done by calling:

```sh
npm install --save react react-art react-dom react-native
```

### From NPM

```sh
npm install --save @rndm/render-plugin-redux
```

### Post Installation

In order to allow this plugin to work, it must first be included in your project. You can do this inside your main index file:

```javascript
import '@rndm/render-plugin-redux';
```

## Usage

The Redux Plugin contains middleware to hook components up to Redux events, such as state and dispatches.

### Middleware

The RNDM Redux Plugin provides a simple way of messaging state changes across components by wrapping redux functionality around them.

#### State

If you wish to hook up a component to change a property based on a global state, you can do this via a simple JSON mapping.

**Example**

```javascript
{
    type: 'react-native.View',
    props: {
        middleware: [
            {
                middleware: 'redux.connect',
                args: [
                    {
                        from: 'rndm.height',
                        to: 'style.height',
                        default: 200,
                    },
                ],
            },
        ],
        style: {
            backgroundColor: 'red',
        },
    },
}
```

When a state change occurs that updates the rndm reducer property of height, this will change the height of the View listening to this state property.

#### Dispatch

Since you may want to call a state change from another Component, you can describe this interaction within a second argument inside the Object.

**Example**

```javascript
{
    type: 'react-native.TouchableOpacity',
    props: {
      middleware: [
            {
                middleware: 'redux.connect',
                args: [
                    [],
                    [
                        {
                            props: 'onPress',
                            action: {
                                type: 'RNDM_UPDATE_HEIGHT',
                                height: 100,
                            },
                        },
                    ],
                ],
            },
        ],
        children: {
            type: 'react-native.Text',
            props: {
                children: 'Dispatch',
            },
        },
    },
}
```

This Component now has a dispatch method triggered when the user taps on the Dispatch text. If both views are visible, the user would immediately see the first view change the height based on this tap.

#### Examples

Full examples can be found in the example library found in this project.

https://github.com/rndm-com/rndm-render-plugin-redux/tree/master/examples

## CLI

The CLI has been created to attempt to address the initial setup of your RNDM-Redux integration. When run, it will attempt to create the correct structure.

_**Note**: This has been tested with fresh installations when using the [RNDM React XP](https://github.com/rndm-com/rndm-react-xp) template. Other templates or projects may not work as expected._

In order to run this, you can call the following command line script:

```sh
rndm-render-plugin-redux init
```

The files it will create will be as below. Should you need to adapt the code or have an existing Redux integration, please cherry pick the items you require from these below setup:

src/app/redux/index.js

```javascript
import { createStore } from 'redux';
import reducers from './reducers/index';
import enhancers from './enhancers/index';

const store = createStore(reducers, enhancers);

export default store;

```

src/app/redux/actions/index.js

```javascript

```

src/app/redux/enhancers/index.js

```javascript
import { compose } from 'redux';
import { get } from 'lodash';
import middleware from '../middleware/index';

const composer = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') || compose;

const enhancers = [middleware];

const output = composer(...enhancers);

export default output;

```

src/app/redux/middleware/index.js

```javascript
import { applyMiddleware } from 'redux';

const middleware = [];

const output = applyMiddleware(...middleware);

export default output;

```

src/app/redux/reducers/index.js

```javascript
import { combineReducers } from 'redux';
import { redux } from '@rndm/render-plugin-redux';

const reducers = {
  ...redux.reducers,
};

const output = combineReducers(reducers);

export default output;

```

src/app/redux/types/index.js

```javascript

```

Check out the [Playground](https://www.rndm.com/playground) page to see how these features work.
