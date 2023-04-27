const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#5DA2FF',
                            '@font-size-base':'14px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
