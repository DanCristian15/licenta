import { hasSessionId as sessionUtilsHasSessionId, getSessionId as sessionUtilsGetSessionId } from '@utils/sessionUtils';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import userAnalytics from './userAnalytics';
import userBrowsingHistory from './userBrowsingHistory';
import userFavoriteEntities from './userFavoriteEntities';
import userLocation from './userLocation';
import userProfile from './userProfile';
import signUp from './signUp';
import loggedUser from './loggedUser';
import addProduct from '../addProduct';

const STORE_NAME = 'user';
const hasSession = sessionUtilsHasSessionId( );

if ( !hasSession ) {
    sessionUtilsGetSessionId( );
}


const store = {
    name: STORE_NAME,
    namespaced: true,
    state: {
        firstAccess: !hasSession
    },
    modules: {
        analytics:              userAnalytics,
        browsingHistory:        userBrowsingHistory,
        favoriteEntities:       userFavoriteEntities,
        location:               userLocation,
        profile:                userProfile,
        signUp:                 signUp,
        loggedUser: loggedUser,
        addProduct: addProduct
    },
    actions: {
        async login( { dispatch, commit }, email ) {
            let response = await dispatch( 'user/profile/get', email, { root: true } );
            if ( !response ) {
                dispatch( `${mutationTypes.CLEAR}` );
                return false;
            }
            response = await dispatch( 'user/profile/getSession', email, { root: true } );
            if ( !response ) {
                dispatch( `${mutationTypes.CLEAR}` );
                return false;
            }
            commit( `user/analytics/${mutationTypes.CLEAR}`, null, { root: true } );

            return true;
        },
        logout( { dispatch } ) {
            dispatch( mutationTypes.CLEAR );
        },
        [ mutationTypes.CLEAR ] ( { commit } ) {
            commit( `user/profile/${mutationTypes.CLEAR}`, null, { root: true } );
            commit( `user/analytics/${mutationTypes.CLEAR}`, null, { root: true } );
            commit( `appState/${mutationTypes.CLEAR}`, null, { root: true } );
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            const ret =  {
                analytics: userAnalytics._persistent.getDataToSave( state[STORE_NAME] ),
                browsingHistory: userBrowsingHistory._persistent.getDataToSave( state[ STORE_NAME ] ),
                location: userLocation._persistent.getDataToSave( state[ STORE_NAME ] ),
                profile: userProfile._persistent.getDataToSave( state[STORE_NAME] ),
            };

            return ret;
        },
        getDataToLoad: ( data ) => {
            const ret = {
                analytics: userAnalytics._persistent.getDataToLoad( data && data.analytics ? data.analytics : { } ),
                browsingHistory: userBrowsingHistory._persistent.getDataToLoad( data && data.browsingHistory ? data.browsingHistory : { } ),
                location: userLocation._persistent.getDataToLoad( data && data.location ? data.location : { } ),
                profile: userProfile._persistent.getDataToLoad( data && data.profile ? data.profile : { } ),
            };
            return ret;
        }
    }
};
export default store;