// Bootstrap sets requirements before running SSR

require('url-loader')
require('file-loader')
require('babel-register')({
    ignore: [/(node_modules)/],
    presets: ['env', 'react-app'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel'
    ]
})

require('./index')
