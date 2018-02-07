import babel from 'rollup-plugin-babel';

export default[
    {
        input : 'src/index.js',
        output : {
            format: 'umd',
            name: 'hyperappAxiosReducer',
            file: 'dist/hyperapp-axios-reducer.js'
        },
        plugins : [babel({exclude: 'node_modules/**', runtimeHelpers: true})]
    }
];
