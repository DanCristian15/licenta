import { mapActions, mapState } from 'vuex';
import truncate from 'lodash/truncate';
import loyaltyConstants from '@core/utils/constants/loyalty';
import IconUser from '@core/shared/assets/icons/user.svg';

let mixin = {
    data: function() {
        return {
            menuOpened: false
        };
    },
    props: {
        userDetail: {
            type: Object,
            default: null
        }
    },
    components: {
        IconUser
    },
    computed: {
        ...mapState( {
            tenantCurrencyType: state => state.appTenant.config.loyalty.currencyType
        } ),
        showUserBalance() {
            return this.tenantCurrencyType === loyaltyConstants.CURRENCY_TYPES.POINTS;
        },
        pointsFormated( ) {
            return this.$options.filters.bonusPoints( this.userDetail.balance );
        },
        fullName() {
            const { firstName, lastName } = this.userDetail;
            const ret = `${firstName} ${lastName}`;
            return !this.$vuetify.breakpoint.mdAndDown ? truncate( ret, { length: 20, } ) : ret;
        }
    },
    methods: {
        ...mapActions( {
            userLogout:                           'user/logout',
            showLoadingOverlay:             'appState/setLoading',
        } ),
        onClickLogout() {
            this.show = false;
            setTimeout( () => {
                this.userLogout();
                this.showLoadingOverlay( true );
                this.$router.go( { name: 'home' } );
            }, 500 );
        }
    },
};

export default mixin;
