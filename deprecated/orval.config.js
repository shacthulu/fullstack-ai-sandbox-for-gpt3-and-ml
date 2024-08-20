module.exports = {
    'presidio-client': {
        input: './presidio_openapi_spec.json',
        output: {
            target: './presidio_client.ts',
            client: 'react-query',
        }
    },
};