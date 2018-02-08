# hyperapp-axios-reducer

[![npm](https://img.shields.io/npm/dm/hyperapp-axios-reducer.svg)](https://www.npmjs.com/package/hyperapp-axios-reducer) [![GitHub license](https://img.shields.io/github/license/jonlov/hyperapp-axios-reducer.svg)](https://github.com/jonlov/hyperapp-axios-reducer/blob/master/LICENSE)

hyperapp-axios-reducer is a 3 KB library (including axios) that expose an api object into the hyperapp actions and handle all the states of the data for you.

## Installation

```bash
npm install --save hyperapp-axios-reducer
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
    const {users} = state.api;

    if (!users) {
        // GET REQUESTS
        api.get('users/jonlov');

        // POST REQUESTS
        // api.post({id:'users/jonlov', data: {username: 'jonlov'}});

        // PUT REQUESTS
        // api.put({id:'users/jonlov', data: {username: 'jonlov'}});

        // DELETE REQUESTS
        // api.delete('users/jonlov');
    }

    if (!users || users && users.isFetching)
        return (
            <div>LOADING</div>
        );

    const {name, avatar_url, error, html_url} = users;
    return (
        <div>
            <a href={html_url} target="_BLANK">
                <div>{name}</div>
                <img src={avatar_url} height="100px"/>
            </a>
            {error}
        </div>
    );
}

const main = app(state, actions, view, document.body);

export default main;
```

## License

hyperapp-axios-reducer is MIT licensed. See `LICENSE.md`.

## Acknowledgements

[Jorge Bucaran](https://github.com/JorgeBucaran) for Hyperapp and [Matt Zabriskie](https://github.com/mzabriskie) for [Axios](https://github.com/mzabriskie/axios). A Promise based HTTP client for the browser and node.js
