/* eslint-disable no-console */
const spawn = require( 'child_process' ).spawn;
const filehound = require( 'filehound' );

const basePath = '${__dirname}/../src';
const tenantsBasePath = `${basePath}/tenants`;
const args = process.argv.splice( 2 );
const productionSourceMap = !!args.filter( item => item.startsWith ( '--productionSourceMap' ) ).length; // Note: productionSourceMap ? TEST environment : UAT environment
const tenantsToBuild = [
    '_main',
    'ticketmaster',
    'torstar',
    'pc',
    'vodafone',
    'trenitalia',
    'milesandmore',
    'rakuten',
    'verizon',
    'adidas',
];

const jobs = filehound
    .create( )
    .path( tenantsBasePath )
    .directory( )
    .depth( 1 )
    .findSync( )
    .map( folder => folder.split( '/' )[ 2 ] )
    .filter( tenant => !productionSourceMap || tenantsToBuild.includes( tenant ) )
    .map( tenant => `yarn build-one --tenant=${tenant} ${args.join( ' ' )}` );


var child = spawn( jobs.join( ' && ' ), {
    shell: true
} );
child.stderr.on( 'data', function ( data ) {
    console.error( data.toString( ) );
} );
child.stdout.on( 'data', function ( data ) {
    console.log( data.toString( ) );
} );
child.on( 'exit', function ( exitCode ) {
    console.log( 'Child exited with code: ' + exitCode );
    if ( exitCode ) {
        throw new Error( 'Something happend on the build' );
    }
} );