export default {
    NAME: 'Lifestyle',
    VERSION: process.env.PACKAGE_VERSION,
    BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP ? process.env.BUILD_TIMESTAMP * 1 : null,
    PUBLIC_PATH: process.env.BASE_URL,
    SUPPRESS_LOGS: process.env.SUPPRESS_LOGS,
};
