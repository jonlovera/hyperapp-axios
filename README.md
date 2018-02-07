# hyperapp-axios-reducer

hyperapp-axios-reducer is a 3 KB library that expose an api object into the hyperapp actions and handle all the states of the data for you.

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
    const {api} = actions;
    const {users} = state.api;

    if (!users) {
        // GET REQUEST
        api.get('users/jonlov');

        // POST REQUEST
        // api.post({id:'users/jonlov', data: {username: 'jonlov'}});

        // PUT REQUEST
        // api.put({id:'users/jonlov', data: {username: 'jonlov'}});

        // DELETE REQUEST
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

### Actions

```js

```

### States

```js

```

## License

hyperapp-axios-reducer is MIT licensed. See `LICENSE.md`.

## Acknowledgements

[Jorge Bucaran](https://github.com/JorgeBucaran) for Hyperapp [Matt Zabriskie](https://github.com/mzabriskie) for [Axios](https://github.com/mzabriskie/axios). A Promise based HTTP client for the browser and node.js
