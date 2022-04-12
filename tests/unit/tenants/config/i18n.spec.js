
import difference from 'lodash/difference';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const filehound = require( 'filehound' );
const fs = require( 'fs' );

const basePath = '${__dirname}/../src/';
const tenantsBasePath = `${basePath}/tenants`;
const CORE_LANGUAGES = [ 'en', 'fr' ];

const subdirectories = filehound
    .create( )
    .path( tenantsBasePath )
    .directory( )
    .depth( 1 )
    .findSync( )
    .forEach( ( folder ) => {
        const tenantName = folder.split( '/' )[ 2 ];
        describe( `Test tenant config -- i18n -- ${ tenantName }`, ( ) => {
            let config;
            
            beforeAll( async ( ) => {
                process.env.TENANT = tenantName;
                config = await import ( `@tenants/${tenantName}/config.js` );
                config = config.default;
            } ) 

            it ( 'i18 is object and contains language and locales ', ( ) => {
                if ( config.i18n ) {
                    const i18n = config.i18n;

                    expect ( typeof i18n === 'object' ).toBe( true );
                    expect ( Object.keys( i18n ).length ).toBe( 2 );
                    expect ( i18n.languages && i18n.locales ).toBeTruthy( );
                }
            } )

            it ( 'All languages are from the core', ( ) => {
                if ( config.i18n && config.i18n.languages ) {
                    const languages = config.i18n.languages;

                    expect ( difference( languages, CORE_LANGUAGES ).length ).toBe( 0 );
                }
            } );

            it( 'Locales contain _core, main and share and those are the languages agree', ( ) => {
                if ( config.i18n && config.i18n.locales ) {
                    const locales = config.i18n.locales;

                    expect ( typeof locales === 'object' ).toBe( true );
                    expect ( Object.keys( locales ).length ).toBe( 3 );
                    expect ( locales._common && locales.shared && locales.main ).toBeTruthy( );
                }
            } )

            it ( 'Locales contain only the languages', ( ) => {
                if ( config.i18n && config.i18n.locales ) {
                    const { _common, shared, main } = config.i18n.locales ;
                    const languages = config.i18n.languages;

                    if ( _common ) {
                        expect( difference( Object.keys(_common), languages || CORE_LANGUAGES ).length ).toBe( 0 )
                    }
                    if ( shared ) {
                        expect( difference( Object.keys(shared), languages || CORE_LANGUAGES ).length ).toBe( 0 )
                    }
                    if ( main ) {
                        expect( difference( Object.keys(main), languages || CORE_LANGUAGES ).length ).toBe( 0 )
                    }
                }
            } )
        } );
    } );
