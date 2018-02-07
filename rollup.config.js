import babel from 'rollup-plugin-babel';

export default[
    {
        input : 'src/index.js',
        output : {
            file: 'dist/hyperapp-axios-reducer.js',
            format: 'iife',
            sourceMap: isWatching,
            moduleName: 'window'
        },
        plugins : [babel({exclude: 'node_modules/**', runtimeHelpers: true})]
    }
];
