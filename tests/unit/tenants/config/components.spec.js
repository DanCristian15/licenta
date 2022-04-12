
import difference from 'lodash/difference';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const filehound = require( 'filehound' );
const fs = require( 'fs' );

const GLOBAL_COMPONENTS = [
    'TenantLogo',
    'TenantLogoIcon' ,
    'TenantLogoLoyaltyPartnerIcon',
    'TenantBonusPointsBadge',
    'TenantBonusPointsHomeBanner',
    'TenantBonusPointsCartCheckoutSummary',
    'TenantBonusPointsCartCheckoutConfirmation',
    'TenantBonusPointsChip',
    'TenantPriceIcon',
    'TenantUserDropdownMenu',
    'TenantUserMobileMenu',
];

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
        describe( `Test tenant config -- Components -- ${ tenantName }`, ( ) => {
            let config;
            
            beforeAll( async ( ) => {
                process.env.TENANT = tenantName;
                config = await import ( `@tenants/${tenantName}/config.js` );
                config = config.default;
            } ) 

            it( 'Config is object', ( ) => {
                if ( config.components ) {
                    expect ( typeof config.components === 'object'  ).toBe( true );
                }
            } );
            it( 'All components are in the core global components list', ( ) => {
                if ( config.routes ) {
                    const diffComponents = difference( Object.keys( config.components ), GLOBAL_COMPONENTS );

                    expect( diffComponents.length ).toBe( 0 );
                }
            } );
        } );
    } );
