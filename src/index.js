import axios from 'axios/dist/axios';

export const setDefaultHeader = (name, value) => {
    axios.defaults.headers.common[name] = value;
}

export default(apiUrl, apiName = 'api') => {
    const getIdAndConfig = (idOrObject) => {
            return (typeof idOrObject === 'object')
                ? idOrObject
                : {
                    id: idOrObject
                };
        },
        fetchHandler = (action, idOrObject, state, updateType) => {
            const {
                id,
                data = {},
                config = {},
                headers = {},
                keepState = false
            } = getIdAndConfig(idOrObject);

            const url = `${apiUrl}/${id}`,
                name = id.split('/')[0],
                oldState = (keepState)
                    ? state[name]
                    : {},
                updateTypeObj = (data) => {
                    return {
                        name,
                        data: {
                            ...oldState,
                            ...data
                        }
                    }
                };

            updateType(updateTypeObj({isFetching: true}));
            axios({method: action, url, data, config, headers}).then((response) => {
                updateType(updateTypeObj(response.data));
            }).catch((error) => {
                updateType(updateTypeObj({
                    error: error.response.data || (error.message).toString()
                }));
            });
        };

    return {
        [apiName]: {
            updateType: ({name, data}) => (state, actions) => ({[name]: data}),
            get: (idOrObject) => (state, actions) => fetchHandler('get', idOrObject, state, actions.updateType),
            post: (idOrObject) => (state, actions) => fetchHandler('post', idOrObject, state, actions.updateType),
            put: (idOrObject) => (state, actions) => fetchHandler('put', idOrObject, state, actions.updateType),
            delete: (idOrObject) => (state, actions) => fetchHandler('delete', idOrObject, state, actions.updateType)
        }
    }
}
