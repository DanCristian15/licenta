const apiBaseUrl = process.env.VUE_APP_PROXY_API_URL || 'http://192.168.0.68:8060';
const devTenantReferer = process.env.VUE_APP_REFERER_URL || 'https://ui.test.lifestyle.shipyardlabs.io/';
const apiBaseApiKey = process.env.VUE_APP_PROXY_API_KEY;
const fs = require( 'fs' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const WarningsToErrorsPlugin = require( 'warnings-to-errors-webpack-plugin' );

const getPackageVersion = ( ) => {
    const fs = require( 'fs' );
    return JSON.parse( fs.readFileSync( './package.json' ) ).version || 0;
};
let tenant =
    process.argv
        .filter( item => item.startsWith ( '--tenant' ) )
        .map( item => item.split( '=' ).reverse()[ 0 ] ) [ 0 ];
if ( process.env.NODE_ENV === 'development' && !tenant ) {
    tenant = '_main';
}
const publicPath = process.env.NODE_ENV === 'production' ? `/${tenant}/` : '/';
const bundleAnalyzer = process.env.APP_BUNDLE_ANALYZER == 'true';
const outputDir = `dist/${tenant}`;
const pathIndexHtml = `src/tenants/${tenant}/public/index.html`;
const pathMainEntry = `src/tenants/${tenant}/main.js`;
if ( !tenant || !fs.existsSync( pathMainEntry ) ) {
    throw new Error ( 'Could not find the tenant ' + tenant );
}

const productionSourceMap = !!process.argv.filter( item => item.startsWith ( '--productionSourceMap' ) ).length;
const pages = {
    app: {
        entry: pathMainEntry,
        template: fs.existsSync( pathIndexHtml ) ? pathIndexHtml : 'public/index.html',
        title: tenant,
        filename: 'index.html'
    }
};

module.exports = {
    productionSourceMap,
    publicPath: publicPath,
    outputDir,
    pages,
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin( {
                'process.env': {
                    PACKAGE_VERSION: '"' + getPackageVersion( ) + '"',
                    BUILD_TIMESTAMP: '"' + ( new Date( ).getTime( ) ) + '"',
                    TENANT: '"' + tenant + '"',
                    SUPPRESS_LOGS: productionSourceMap
                }
            } ),
            new BundleAnalyzerPlugin( {
                analyzerMode: bundleAnalyzer === true ? 'server' : 'disabled',
                generateStatsFile: false,
                statsOptions: { source: false }
            } ),
            new WarningsToErrorsPlugin( )
        ],
        resolve: {
            extensions: [ '*', '.js', '.vue', '.json' ],
            alias: {
                '@': path.resolve( 'src' ),
                '@core': path.resolve( 'src/core' ),
                '@api': path.resolve( 'src/core/api' ),
                '@assets': path.resolve( 'src/core/shared/assets' ),
                '@filters': path.resolve( 'src/core/filters' ),
                '@helpers': path.resolve( 'src/core/helpers' ),
                '@locales': path.resolve( 'src/core/locales' ),
                '@mixins': path.resolve( 'src/core/mixins' ),
                '@routes': path.resolve( 'src/core/routes' ),
                '@services': path.resolve( 'src/core/services' ),
                '@shared': path.resolve( 'src/core/shared' ),
                '@scss': path.resolve( 'src/core/scss' ),
                '@views': path.resolve( 'src/core/views' ),
                '@store':  path.resolve( 'src/core/store' ),
                '@utils': path.resolve( 'src/core/utils' ),
                '@scssVariables': path.resolve( 'src/core/scss/_variables.scss' ),
                '@scssMixins': path.resolve( 'src/core/scss/mixins/_index.scss' ),
                '@tenants': path.resolve( 'src/tenants' ),
                '@tenant': path.resolve( `src/tenants/${tenant}` ),
                '@tenantScssThemeVariables': path.resolve( `src/tenants/${tenant}/theme-colors.scss` ),
            }
        }
    },
    transpileDependencies: [ 'vuetify', 'vue-clamp', 'resize-detector' ],
    chainWebpack: config => {
        const svgRule = config.module.rule( 'svg' );

        svgRule.uses.clear();

        svgRule
            .use( 'babel-loader' )
            .loader( 'babel-loader' )
            .end( )
            .use( 'vue-svg-loader' )
            .loader( 'vue-svg-loader' )
            .options( {
                svgo: {
                    plugins: [
                        { removeDimensions: false },
                        { removeViewBox: false }
                    ]
                }
            } );



        config.plugin( 'copy' ).tap( ( [ pathConfigs ] ) => {
            const pathDist = pathConfigs[0].to || path.resolve( __dirname, './dist' );

            pathConfigs.push( {
                from: path.resolve( __dirname, `./src/tenants/${tenant}/public` ),
                to: `${pathDist}`,
                toType: 'dir',
                ignore: [ 'index.html' ]
            } );

            return [ pathConfigs ];
        } );

        config.plugins.delete( 'pwa' );
        config.plugins.delete( 'workbox' );
        config.performance
            .maxEntrypointSize( 4 * 1000 * 1000 )
            .maxAssetSize( 4 * 1000 * 1000 );

        return config;
    },
    css: {
        extract: {
            ignoreOrder: true
        },
    },
    pwa: {
        manifestCrossorigin: 'use-credentials',
        workboxOptions: {
            skipWaiting: true,
            navigateFallback: '/index.html'
        }
    },
    lintOnSave: false,
    devServer: {
        // Paths
        proxy: {
            '^/api': {
                target: apiBaseUrl,
                ws: true,
                secure: false,
                xfwd: false,
                changeOrigin: true,
                headers: {
                    apiKey: apiBaseApiKey,
                    referer: devTenantReferer
                }
            }
        }
    }
};
