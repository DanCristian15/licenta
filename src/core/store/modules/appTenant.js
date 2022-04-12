import appTenantConstants from '@core/utils/constants/appTenant';
import loyaltyConstants from '@core/utils/constants/loyalty';
import { getCurrent as appTenantUtilsGetCurrent } from '@core/utils/appTenantUtils';

const STORE_NAME = 'appTenant';

export default {
    name: STORE_NAME,
    namespaced: true,
    state: {
        name: appTenantConstants.NO_TENANT_NAME,
        path: appTenantConstants.NO_TENANT_NAME,
        config: {
            loyalty: {
                currencyType: loyaltyConstants.CURRENCY_TYPES.POINTS,
                type: loyaltyConstants.TYPES.BOTH,
                earnRate: null
            }
        }
    },
    getters: {
        isTenant: state => state.name !== appTenantConstants.NO_TENANT_NAME,
        isLoyaltyTypeAllowEarn: state => state.config.loyalty.type === loyaltyConstants.TYPES.EARN || state.config.loyalty.type === loyaltyConstants.TYPES.BOTH,
        isLoyaltyTypeAllowRedeem: state => state.config.loyalty.type === loyaltyConstants.TYPES.REDEEM || state.config.loyalty.type === loyaltyConstants.TYPES.BOTH,
        isLoyaltyCurrencyTypePoints: state => state.config.loyalty.currencyType === loyaltyConstants.CURRENCY_TYPES.POINTS,
        isLoyaltyCurrencyTypeMoney: state => state.config.loyalty.currencyType === loyaltyConstants.CURRENCY_TYPES.MONEY,
        earnRate: state => state.config.loyalty.earnRate,
    },
    mutations: {
        setTenant( state, tenant ) {
            state.name = tenant;
            state.path = tenant;
        },
        setConfig( state, config ) {
            state.config = {
                loyalty: {
                    ...state.config.loyalty,
                    ...config.loyalty
                }
            };
        }
    },
    actions: {
        async read( { commit, state } ) {
            return await new Promise( resolve => {
                setTimeout( ( ) => {
                    commit( 'setTenant', appTenantUtilsGetCurrent( ) );
                    resolve ( state.name );
                }, 100 );
            } );
        }
    }
};
