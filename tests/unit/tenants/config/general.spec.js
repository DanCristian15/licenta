
import difference from 'lodash/difference';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const filehound = require( 'filehound' );
const fs = require( 'fs' );
const basePath = '${__dirname}/../src/';
const tenantsBasePath = `${basePath}/tenants`;

const subdirectories = filehound
    .create( )
    .path( tenantsBasePath )
    .directory( )
    .depth( 1 )
    .findSync( )
    .forEach( ( folder ) => {
        const tenantName = folder.split( '/' )[ 2 ];
        describe( `Test tenant config -- General -- ${ tenantName }`, ( ) => {
            let config;
            
            beforeAll( async ( ) => {
                process.env.TENANT = tenantName;
                config = await import ( `@tenants/${tenantName}/config.js` );
                config = config.default;
            } ) 

            it( 'Have only agree customization', ( ) => {
                const { name, assets, i18n, theme, components, routes, store, ...rest } = config;
                expect ( rest ).toMatchObject( { } ); 
            } )

            it( `Have name`, ( ) => {
                expect ( config ).toHaveProperty( 'name', tenantName );
            } )
        } );
    } );
