
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const filehound = require( 'filehound' );
const fs = require( 'fs' );


const basePath = '${__dirname}/../src/';
const tenantsBasePath = `${basePath}/tenants`;

filehound
    .create( )
    .path( tenantsBasePath )
    .directory( )
    .depth( 1 )
    .findSync( )
    .forEach( ( folder ) => {
        const tenantName = folder.split( '/' )[ 2 ];
        const tenantBasePath = `${__dirname}/../../../${folder}`;  
        
        describe( `Test tenant folder structure -- ${ tenantName }`, ( ) => {
            it( `Folder have main.js` , ( ) => {
                expect(fs.existsSync( `${tenantBasePath}/main.js` )).toBe( true );
            } );

            it( `Folder have config.js` , ( ) => {
                expect(fs.existsSync( `${tenantBasePath}/config.js` )).toBe( true );
            } );

            it( `Folder have themeColors.scss` , ( ) => {
                expect(fs.existsSync( `${tenantBasePath}/theme-colors.scss` )).toBe( true );
            } );

            it( `Folder have themeColors.scss` , ( ) => {
                expect(fs.existsSync( `${tenantBasePath}/theme-colors-export-js.scss` )).toBe( true );
            } );
        } );
    } );
