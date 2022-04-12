
import difference from 'lodash/difference';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const filehound = require( 'filehound' );
const fs = require( 'fs' );

import { appMainTheme } from '@core/utils/appMainTheme';

const basePath = '${__dirname}/../src/';
const tenantsBasePath = `${basePath}/tenants`;
const subdirectories = filehound
    .create()
    .path( tenantsBasePath )
    .directory()
    .depth( 1 )
    .findSync()
    .forEach( ( folder ) => {
        const tenantName = folder.split( '/' )[ 2 ];
        describe( `Test tenant config -- Theme -- ${tenantName}`, () => {
            let config, themeColors;

            beforeAll( async () => {
                process.env.TENANT = tenantName;
                config = await import( `@tenants/${tenantName}/config.js` );
                themeColors = await import( `@tenants/${tenantName}/theme-colors-export-js.scss` );
                delete themeColors.default;
                config = config.default;
            } )

            it( 'is object and contains only vuetify', () => {
                expect( typeof config.theme === 'object' ).toBe( true );
                expect( Object.keys( config.theme ).length ).toBe( 2 );
                expect( typeof config.theme.vuetify === 'object' ).toBe( true );
            } )

            it( 'Vuefity - all colors are defined', () => {
                if ( config.theme && config.theme.vuetify ) {
                    const excludedKeys = [];
                    const diffThemeVsTenant = difference( Object.keys( appMainTheme ), Object.keys( config.theme.vuetify ) );
                    const diffTenantVsTheme = difference( Object.keys( config.theme.vuetify ), Object.keys( appMainTheme ) );

                    expect( difference( diffThemeVsTenant, excludedKeys ).length ).toBe( 0 );
                    expect( diffTenantVsTheme.length ).toBe( 0 );
                }
            } );

            it( 'Vuefity - ThemeColors.scss - all colors are defined', () => {
                if ( config.theme && config.theme.vuetify ) {
                    const excludedKeys = [];
                    const diffThemeVsTenant = difference( Object.keys( appMainTheme ), Object.keys( themeColors ) );
                    const diffTenantVsTheme = difference( Object.keys( themeColors ), Object.keys( appMainTheme ) );

                    expect( difference( diffThemeVsTenant, excludedKeys ).length ).toBe( 0 );
                    expect( diffTenantVsTheme.length ).toBe( 0 );
                }
            } );

            //TODO remove after refactor
            it( 'Vuefity - Difference between old and new - all colors are defined and are with uppercase', () => {
                if ( config.theme && config.theme.vuetify ) {
                    const diffOldNew = difference( Object.keys( config.theme.vuetifyOld ), Object.keys( config.theme.vuetify ) );

                    expect( diffOldNew.length ).toBe( 0 );

                    Object.keys( config.theme.vuetifyOld ).forEach( key => {
                        expect( config.theme.vuetifyOld[ key ], `${key} should be uppercase` ).toBe( config.theme.vuetifyOld[ key ].toUpperCase() );
                        expect( config.theme.vuetify[ key ], `${key} should be uppercase` ).toBe( config.theme.vuetify[ key ].toUpperCase() );
                        expect( config.theme.vuetifyOld[ key ], `${key} don't match between config and theme-color.scss` ).toBe( config.theme.vuetify[ key ] );
                    } );
                }
            } );

            it( 'Vuefity - all colors are hexa colors', () => {
                if ( config.theme && config.theme.vuetify ) {
                    const vuetify = config.theme.vuetify;
                    const tenantColorKeys = Object.keys( vuetify );
                    tenantColorKeys.forEach( key => {
                        expect( vuetify[ key ] ).toMatch( new RegExp( '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' ) );
                    } )
                }
            } );
            it( 'Vuefity - favoriteMarked and favoriteUnMarked colors are different and are the same with main config', () => {
                if ( config.theme && config.theme.vuetify ) {
                    const vuetify = config.theme.vuetify;
                    expect( vuetify.favoriteMarked ).toBe( appMainTheme.favoriteMarked );
                    expect( vuetify.favoriteUnMarked ).toBe( appMainTheme.favoriteUnMarked );
                    expect( vuetify.favoriteMarked !== vuetify.favoriteUnMarked ).toBe( true );
                }
            } );
            it( 'Vuefity - colors that need to match to the ones from the appTheme', () => {
                if ( config.theme && config.theme.vuetify ) {
                    const vuetify = config.theme.vuetify;
                    expect( vuetify.eventStatusChipCancelled ).toBe( appMainTheme.eventStatusChipCancelled );
                    expect( vuetify.eventStatusChipPostponed ).toBe( appMainTheme.eventStatusChipPostponed );
                    expect( vuetify.eventStatusChipRescheduled ).toBe( appMainTheme.eventStatusChipRescheduled );
                }
            } );
        } );
    } );
