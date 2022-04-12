
import difference from 'lodash/difference';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const filehound = require( 'filehound' );
const fs = require( 'fs' );

import commonRoutes from '@core/routes/index';


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
        describe( `Test tenant config -- Routes -- ${ tenantName }`, ( ) => {
            let config;
            
            beforeAll( async ( ) => {
                process.env.TENANT = tenantName;
                config = await import ( `@tenants/${tenantName}/config.js` );
                config = config.default;
            } ) 

            it( 'Routes is array', ( ) => {
                if ( config.routes ) {
                    expect ( Array.isArray( config.routes )  ).toBeTruthy( );
                }
            } );
            it( 'All elements contains name and component', ( ) => {
                if ( config.routes ) {
                    config.routes.forEach( ( item ) => {
                        expect ( Object.keys( item ).length ).toBe( 2 );
                        expect ( item.name && item.component ).toBeTruthy( );
                    } );
                }
            } );
            it( 'Routes - all custom routes are in the core custom routes', ( ) => {
                if ( config.routes ) {
                    const diffRoutesByName = difference( 
                        config.routes.map( item => item.name), 
                        commonRoutes.map( item => item.name ) 
                    );
                
                    expect( diffRoutesByName.length ).toBe( 0 );
                }
            } );
        } );
    } );
