<template>
    <div>
        <v-btn
            v-if="getIsLogged !== true"
            center
            text
            class="gst-login-btn"
            v-bind="$attrs"
            primary
            @click="$emit('click')">
            <IconUser class="gst-login-btn__icon" />
            {{ $t('_common:buttons.login') }}
        </v-btn>
        <v-btn
            v-else
            center
            text
            class="gst-login-btn"
            v-bind="$attrs"
            primary
            @click="goToLoggedUserProfile">
            <IconUser class="gst-login-btn__icon" />
            {{ getLoggedUser.username }}
        </v-btn>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import IconUser from '@core/shared/assets/icons/user.svg';

    export default {
        name: 'LoginButtonVariant1',
        inheritsAttribute: true,
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.buttons'
        },
        components: {
            IconUser
        },
        computed: {
            ...mapGetters( {
                getIsLogged: 'user/loggedUser/getIsLogged',
                getLoggedUser: 'user/loggedUser/getLoggedUser',
            } )
        },
        methods: {
            goToLoggedUserProfile() {
                this.$router.push( { name: 'loggedUserProfile' } );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssMixins";
    @import "@scssVariables";

    .gst-login-btn.v-btn {
        height: 42px;
        padding: 0 13px;
        background-color: #ADACAC;
        color: theme-color( 'white' );
        font-size: font-size( 'xs' );
        font-weight: font-weight( 'bold' );
        // border-radius: border-radius( 'm' ) !important;
        text-transform: none;
        min-width: auto;

        .gst-login-btn__icon {
            margin-right: 3px;
        }

        .gst-login-btn__icon .gst-svg-icon {
            fill: theme-color( "white" );
        }
    }
</style>
