import {
    normalizeSuccess as apiUtilsNormalizeSuccess,
    normalizeListSuccess as apiUtilsNormalizeListSuccess,
    normalizeError as apiUtilsNormalizeError
} from '@core/utils/apiUtils';

import LogService from '@services/LogService';
import {
    attractionsMockData,
    categoriesMockData,
    citiesMockData,
    cartMockData,
    eventsMockData,
    ticketsMockData,
    venuesMockData,
    statesMockData,
    countriesMockData,
    shippingOptionsMockData,
    hotelsMockData,
} from './mockData';

const deferLoadingTime = 2 * 1000;

const FAKE_STATE = {
    attractions: attractionsMockData,
    categories: categoriesMockData,
    cities: citiesMockData,
    cart: cartMockData,
    events: eventsMockData,
    tickets: ticketsMockData,
    venues: venuesMockData,
    states: statesMockData,
    countries: countriesMockData,
    shippingOptions: shippingOptionsMockData,
    hotels: hotelsMockData
};

const createModuleGetMethods = ( entity ) => {
    return {
        get: ( { keyword = '', offset = 0, limit = 5000, category = '' } )            => new Promise( resolve => {
            setTimeout( ( ) => {
                let responseData = entity.data.items;
                if ( keyword ) {
                    responseData = responseData.filter ( entity.filterByKeyword( keyword ) );
                }
                if ( category ) {
                    responseData = responseData.filter ( entity.filterByCategory( category ) );
                }
                resolve( apiUtilsNormalizeListSuccess( {
                    data: {
                        items:[ ...responseData ].splice( offset, limit ),
                        totalCount: entity.data.totalCount ? entity.data.totalCount : entity.data.items.length
                    }
                } ) );
            }, deferLoadingTime );
        } ),
        one: ( id )         =>  new Promise( resolve => {
            setTimeout( ( ) => {
                let item = entity.data.items.filter( obj => obj.id == id )[ 0 ];

                if ( item ) {
                    resolve( apiUtilsNormalizeSuccess( { data: item } ) );
                } else {
                    resolve ( apiUtilsNormalizeError( { message: 'Item not found' } ) );
                }

            }, deferLoadingTime );
        } )
    };
};

export default {
    getCancelRequest: ( ) => {
        return {
            token: '',
            cancel: ( ) => { }
        };
    },
    attractions:    createModuleGetMethods( FAKE_STATE.attractions, { } ),
    cart: {
        addItem: ( { eventId, ticketTypeId, quantity, seats, row, section  } ) => {
            return new Promise( ( resolve ) => {
                // eslint-disable-next-line no-console
                LogService.debug( 'Arguments reserve ticket', eventId, ticketTypeId, quantity, seats, row, section );
                setTimeout( ( ) => {
                    resolve( apiUtilsNormalizeSuccess( {
                        data: FAKE_STATE.cart
                    } ) );
                }, deferLoadingTime );
            } );
        },
        checkout: ( id, data ) => {
            return new Promise( resolve => {
                // eslint-disable-next-line no-console
                LogService.debug( 'Arguments reserve ticket', id, data );
                setTimeout( ( ) => {
                    resolve ( apiUtilsNormalizeSuccess ( { data: {} } ) );
                }, deferLoadingTime );
            } );
        },
        delete: ( id ) => {
            return new Promise( resolve => {
                // eslint-disable-next-line no-console
                LogService.debug( 'Arguments reserve ticket', id );
                setTimeout( ( ) => {
                    resolve ( apiUtilsNormalizeSuccess ( { data: {} } ) );
                }, deferLoadingTime );
            } );
        }
    },
    categories:     createModuleGetMethods( FAKE_STATE.categories, { } ),
    cities:         createModuleGetMethods( FAKE_STATE.cities, { } ),
    events: {
        ...createModuleGetMethods( FAKE_STATE.events ),
        infoDetails: ( ) => {
            return new Promise( ( resolve ) => {
                setTimeout( () => {
                    let data = FAKE_STATE.events.infoDetailsData;
                    resolve( apiUtilsNormalizeSuccess( { data: data } ) );
                }, deferLoadingTime );
            } );
        },
        dates: ( ) => {
            return new Promise( resolve => {
                setTimeout( () => {
                    let items = FAKE_STATE.events.datesData.items;
                    resolve( apiUtilsNormalizeSuccess( { data: { items: items } } ) );
                }, deferLoadingTime );
            } );
        }
    },
    payments: {
        getClientToken: ( ) => {
            return new Promise( ( resolve ) => {
                setTimeout( ( ) => {
                    resolve ( apiUtilsNormalizeSuccess( {
                        data : {
                            clientToken: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI1MjgxODAyOTdkYjc5MjJjOTJlMTg3YmVhYTBjZTg3MDQ0YjcyZjk3MWE5NTdiMmMwMzc1MDJhODFhMGQ1NDlmfGNyZWF0ZWRfYXQ9MjAyMC0wMy0xMlQxNDozNDozOS4zNzgxODU2NDYrMDAwMFx1MDAyNm1lcmNoYW50X2FjY291bnRfaWQ9dGlja2V0bWFzdGVybGxjVVNEXHUwMDI2bWVyY2hhbnRfaWQ9NTd5bWM2aGNqNWprMzR0dFx1MDAyNnB1YmxpY19rZXk9eHB4OXZzbWticm4ycnN3aiIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvNTd5bWM2aGNqNWprMzR0dC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4In0sImNoYWxsZW5nZXMiOlsiY3Z2Il0sImVudmlyb25tZW50IjoicHJvZHVjdGlvbiIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvNTd5bWM2aGNqNWprMzR0dC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL2NsaWVudC1hbmFseXRpY3MuYnJhaW50cmVlZ2F0ZXdheS5jb20vNTd5bWM2aGNqNWprMzR0dCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJUaWNrZXRtYXN0ZXIsIExMQyIsImNsaWVudElkIjoiQVhqMk1GMHFlaUoxZ25pczZIMFFRdFk0NEt3REdFbGEtMjRmVmk4TThtSEhmcWJlXzB3U2k5dGJNNExqaDYweWtQQnlja19JRE1mbHV5YVkiLCJwcml2YWN5VXJsIjoiaHR0cDovL3RpY2tldG1hc3Rlci5jb20iLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL3RpY2tldG1hc3Rlci5jb20iLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOmZhbHNlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6ZmFsc2UsImVudmlyb25tZW50IjoibGl2ZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6IkFSS3JZUkRoM0FHWER6VzdzT18zYlNrcS1VMUM3SEdfdVdOQy16NTdMallTRE5VT1NhT3RJYTlxNlZwVyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJ0aWNrZXRtYXN0ZXJsbGNVU0QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwibWVyY2hhbnRJZCI6IjU3eW1jNmhjajVqazM0dHQiLCJ2ZW5tbyI6Im9mZiIsImFwcGxlUGF5Ijp7InN0YXR1cyI6InByb2R1Y3Rpb24iLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLnRub3ciLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiLCJkaXNjb3ZlciJdfSwibWVyY2hhbnRBY2NvdW50SWQiOiJ0aWNrZXRtYXN0ZXJsbGNVU0QifQ==',
                            providerId: 'BRAINTREE'
                        }
                    } ) );
                }, 0.5 * 1000 );
            } );

        }
    },
    tickets:   {
        get: ( ) => new Promise( resolve => {
            setTimeout( ( ) => {
                resolve( apiUtilsNormalizeSuccess( { data : FAKE_STATE.tickets.data } ) );
            }, deferLoadingTime );
        } ),
    },
    venues:         createModuleGetMethods( FAKE_STATE.venues, { } ),
    states:         createModuleGetMethods( FAKE_STATE.states, { } ),
    countries:      createModuleGetMethods( FAKE_STATE.countries, {} ),
    hotels:         {
        ...createModuleGetMethods( FAKE_STATE.hotels, { } ),
        get: ( ) => new Promise( resolve => {
            setTimeout( ( ) => {
                resolve( apiUtilsNormalizeSuccess ( { data: FAKE_STATE.hotels.data } ) );
            }, deferLoadingTime );
        } ),
    },
    shippingOptions: {
        get: ( { country = '' } ) => new Promise( resolve => {
            setTimeout( ( ) => {
                if ( country !== 'CA' ) {
                    let items = FAKE_STATE.shippingOptions.data.items;
                    resolve( apiUtilsNormalizeSuccess( { data: { items: items } } ) );
                } else {
                    let items = [];
                    resolve( apiUtilsNormalizeSuccess( { data: { items: items } } ) );
                }
            }, deferLoadingTime );
        } )
    }
};
