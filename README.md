# hyperapp-axios-reducer

[![npm](https://img.shields.io/npm/dm/hyperapp-axios-reducer.svg)](https://www.npmjs.com/package/hyperapp-axios-reducer) [![GitHub license](https://img.shields.io/github/license/jonlov/hyperapp-axios-reducer.svg)](https://github.com/jonlov/hyperapp-axios-reducer/blob/master/LICENSE)

hyperapp-axios-reducer is a 1.5 KB library that expose an api object into the hyperapp actions and automatically sync the hyperapp state with the response.

## Installation

```bash
npm install --save axios hyperapp-axios-reducer
```

### Dependencies

`hyperapp-axios-reducer` depends on `axios`.

### Getting Started

```js
import {h, app} from "hyperapp"
import apiActions from "hyperapp-axios-reducer";

const state = {};

const actions = {
    ...apiActions('https://api.github.com')
};

const view = (state, actions) => {
    // it will add an api object which contains
    // get, post, put and delete functions
    const {api} = actions;

    // it will add an api object to the state which depending
    // on the data you're requesting it will append
    // isFetching and the object itself
    const {repos} = state.api;

    if (!users) {
        // GET REQUESTS
        api.get('repos/jonlov/hyperapp-axios-reducer');

        // POST REQUESTS
        // api.post({id:'repos/jonlov/hyperapp-axios-reducer', data: {username: 'jonlov'}});

        // PUT REQUESTS
        // api.put({id:'repos/jonlov/hyperapp-axios-reducer', data: {username: 'jonlov'}});

        // DELETE REQUESTS
        // api.delete('repos/jonlov/hyperapp-axios-reducer');
    }

    if (!users || users && users.isFetching)
        return (
            <h1>LOADING</h1>
        );

    const {name, error, html_url} = repos;
    return (
        <div>
            <a href={html_url} target="_BLANK">
                <h1>{name}</h1>
            </a>
            {error}
        </div>
    );
}

const main = app(state, actions, view, document.body);

export default main;
```

([Live example](https://codepen.io/0n/pen/aqpbLm))

## License

hyperapp-axios-reducer is MIT licensed. See `LICENSE.md`.

## Acknowledgements

[Jorge Bucaran](https://github.com/JorgeBucaran) for Hyperapp and [Matt Zabriskie](https://github.com/mzabriskie) for [Axios](https://github.com/mzabriskie/axios). A Promise based HTTP client for the browser and node.js
