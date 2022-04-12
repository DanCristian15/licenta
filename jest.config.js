process.env.TENANT = '_main';

module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    modulePaths: [ 'node_modules', 'src' ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@api/(.*)$': '<rootDir>/src/core/api/$1',
        '^@assets/(.*)$': '<rootDir>/src/core/assets/$1',
        '^@helpers/(.*)$': '<rootDir>/src/core/helpers/$1',
        '^@mixins/(.*)$': '<rootDir>/src/core/mixins/$1',
        '^@routes/(.*)$': '<rootDir>/src/core/routes/$1',
        '^@services': '<rootDir>/src/core/services',
        '^@services/(.*)$': '<rootDir>/src/core/services/$1',
        '^@shared/(.*)$': '<rootDir>/src/core/shared/$1',
        '^@scss/(.*)$': '<rootDir>/src/core/scss/$1',
        '^@views/(.*)$': '<rootDir>/src/core/views/$1',
        '^@store/(.*)$': '<rootDir>/src/core/store/$1',
        '^@utils/(.*)$': '<rootDir>/src/core/utils/$1',
        '^@scssVariables/(.*)$': '<rootDir>/src/core/scss/_variables.scss',
        '^@scssMixins/(.*)$': '<rootDir>src/core/scss/mixins/_index.scss',
        '^@tenants/(.*)$': '<rootDir>/src/tenants/$1',
    },
    transform: {
        '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
    },
    setupFilesAfterEnv: [ 'jest-expect-message' ]
};
