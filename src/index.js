import axios from 'axios/dist/axios';

export default(apiUrl) => {
    return {
        api: {
            updateType: ({name, data}) => (state, actions) => ({[name]: data}),
            get: (var1, config) => (state, actions) => {
                if (typeof var1 != 'object') {
                    const name = var1.split('/')[0];

                    actions.updateType({
                        name,
                        data: {
                            isFetching: true
                        }
                    });

                    axios.get(`${apiUrl}/${var1}`, config).then((response) => {
                        actions.updateType({
                            name,
                            data: {
                                ...response.data
                            }
                        });
                    }).catch((error) => {
                        actions.updateType({
                            name,
                            data: {
                                error: error.toString()
                            }
                        });
                    });
                }
            },
            post: (var1) => (state, actions) => {
                const {
                        data = {},
                        config = {}
                    } = var1,
                    url = (typeof var1 === 'object')
                        ? var1.url
                        : var1,
                    name = url.split('/')[0];

                actions.updateType({
                    name,
                    data: {
                        isFetching: true
                    }
                });

                axios.post(`${apiUrl}/${url}`, data, config).then((response) => {
                    actions.updateType({
                        name,
                        data: {
                            ...response.data
                        }
                    });
                }).catch((error) => {
                    actions.updateType({
                        name,
                        data: {
                            error: (error.message || error).toString()
                        }
                    });
                });
            },
            put: (var1) => (state, actions) => {
                const {
                        data = {},
                        config = {}
                    } = var1,
                    url = (typeof var1 === 'object')
                        ? var1.url
                        : var1,
                    name = url.split('/')[0];

                actions.updateType({
                    name,
                    data: {
                        isFetching: true
                    }
                });

                axios.put(`${apiUrl}/${url}`, data, config).then((response) => {
                    actions.updateType({
                        name,
                        data: {
                            ...response.data
                        }
                    });
                }).catch((error) => {
                    actions.updateType({
                        name,
                        data: {
                            error: (error.message || error).toString()
                        }
                    });
                });
            },
            delete: (var1) => (state, actions) => {
                const {
                        config = {}
                    } = var1,
                    url = (typeof var1 === 'object')
                        ? var1.url
                        : var1,
                    name = url.split('/')[0];

                actions.updateType({
                    name,
                    data: {
                        isFetching: true
                    }
                });

                axios.delete(`${apiUrl}/${url}`, config).then((response) => {
                    actions.updateType({
                        name,
                        data: {
                            ...response.data
                        }
                    });
                }).catch((error) => {
                    actions.updateType({
                        name,
                        data: {
                            error: (error.message || error).toString()
                        }
                    });
                });
            }
        }
    }
}
