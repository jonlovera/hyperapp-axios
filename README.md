# hyperapp-axios

[![GitHub license](https://img.shields.io/github/license/jonlov/hyperapp-axios.svg)](https://github.com/jonlov/hyperapp-axios/blob/master/LICENSE.md)

hyperapp-axios is a 1.5 KB library that exposes an api object into the hyperapp actions and automatically syncs the hyperapp state with axios response.

## Installation

```bash
npm install --save hyperapp-axios
```

### Dependencies

`hyperapp-axios` depends on `axios`.

### Getting Started

```js
import {h, app} from "hyperapp"
import apiActions from "hyperapp-axios";

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

    if (!repos) {
        // GET REQUESTS
        api.get('repos/jonlov/hyperapp-axios');

        // POST REQUESTS
        // api.post({id:'repos/jonlov/hyperapp-axios', data: {username: 'jonlov'}});

        // PUT REQUESTS
        // api.put({id:'repos/jonlov/hyperapp-axios', data: {username: 'jonlov'}});

        // DELETE REQUESTS
        // api.delete('repos/jonlov/hyperapp-axios');
    }

    if (!repos || repos && repos.isFetching)
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

# Gif search example

This is an example of the same ([hypperapp gif search example](https://codepen.io/hyperapp/pen/ZeByKv)) but instead was rewritten with hyperapp-axios in few lines of code.

```js
import {h, app} from "hyperapp"
import apiActions from "hyperapp-axios";

const GIPHY_API_KEY = "dc6zaTOxFJmzC";

const state = {};
const actions = {
    ...apiActions('https://api.giphy.com/v1'),
    search: e => (state, actions) => {
        actions.api.get(`gifs/search?q=${e.target.value}&api_key=${GIPHY_API_KEY}`);
    }
};

const view = (state, actions) => {
    // it will add an api object to the state which depending
    // on the data you're requesting it will append
    // isFetching and the object itself
    const gifs = state.api.gifs;
    const url = (gifs && !gifs.isFetching && gifs.data)
        ? gifs.data[0].images.original.url
        : "https://i.pinimg.com/originals/87/b8/67/87b8671c2d08dc83554806539022bde7.gif";

    return (
        <main>
            <input type="text" onkeyup={actions.search} placeholder="Type here..." autofocus/>
            <div class="container" style={{
                backgroundImage: 'url(' + url + ')'
            }}/>
        </main>
    );
}

const main = app(state, actions, view, document.body);
```

([Live example](https://codepen.io/0n/pen/JpEejd))

## License

hyperapp-axios is MIT licensed. See ([LICENSE.md](https://github.com/jonlov/hyperapp-axios/blob/master/LICENSE.md)).

## Acknowledgements

[Jorge Bucaran](https://github.com/JorgeBucaran) for Hyperapp and [Matt Zabriskie](https://github.com/mzabriskie) for [Axios](https://github.com/mzabriskie/axios). A Promise based HTTP client for the browser and node.js
