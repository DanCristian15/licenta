
import { hasSessionId as sessionUtilsHasSessionId, getSessionId as sessionUtilsGetSessionId } from '@utils/sessionUtils';
import mutationTypes from '@core/helpers/storeFactories/helpers/mutationTypes';
import LogService from '@services/LogService';
import userProfile from './userProfile';

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
        profile:                userProfile,
    },
    actions: {
        async login( { dispatch, commit }, email ) {
            let response = await dispatch( 'user/profile/get', email, { root: true } );
            if ( !response ) {
                dispatch( 'clear' );
                return false;
            }
            response = await dispatch( 'user/profile/getSession', email, { root: true } );
            if ( !response ) {
                dispatch( 'clear' );
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
        }
    },
    _persistent: {
        getDataToSave: ( state ) => {
            const ret =  {
                profile: userProfile._persistent.getDataToSave( state[STORE_NAME] ),
            };

            return ret;
        },
        getDataToLoad: ( data ) => {
            try {
                return {
                    profile: userProfile._persistent.getDataToLoad( data.profile ),
                };
            } catch ( e ) {
                LogService.error( `Vuex state cannot be loaded: User: ${ e.message }` );
                return null;
            }
        }
    }
};
export default store;