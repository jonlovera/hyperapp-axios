import babel from 'rollup-plugin-babel';

export default[
    {
        input : 'src/index.js',
        output : {
            format: 'umd',
            name: 'hyperappAxios',
            file: 'dist/hyperapp-axios.js'
        },
        plugins : [babel({exclude: 'node_modules/**', runtimeHelpers: true})]
    }
];
