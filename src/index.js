import axios from 'axios/dist/axios';

export default(apiUrl, apiName='api') => {
    const getIdAndConfig = (idOrObject) => {
            return (typeof idOrObject === 'object')
                ? idOrObject
                : {
                    id: idOrObject
                };
        },
        fetchHandler = (action, idOrObject, updateType) => {
            const {
                id,
                data = {},
                header = {},
                config = {}
            } = getIdAndConfig(idOrObject);

            const url = `${apiUrl}/${id}`,
                name = id.split('/')[0],
                updateTypeObj = (data) => {
                    return {
                        name,
                        data: {
                            ...data
                        }
                    }
                };

            updateType(updateTypeObj({isFetching: true}));
            axios({
                method: action,
                url,
                data,
                header,
                config
            }).then((response) => {
                updateType(updateTypeObj(response.data));
            }).catch((error) => {
                updateType(updateTypeObj({
                    error: (error.message || error).toString()
                }));
            });
        };

    return {
        [apiName]: {
            updateType: ({name, data}) => (state, actions) => ({[name]: data}),
            get: (idOrObject) => (state, actions) => fetchHandler('get', idOrObject, actions.updateType),
            post: (idOrObject) => (state, actions) => fetchHandler('post', idOrObject, actions.updateType),
            put: (idOrObject) => (state, actions) => fetchHandler('put', idOrObject, actions.updateType),
            delete: (idOrObject) => (state, actions) => fetchHandler('delete', idOrObject, actions.updateType)
        }
    }
}
