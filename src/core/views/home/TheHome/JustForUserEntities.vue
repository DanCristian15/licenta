<template>
    <div>
        <DataLoading v-if="loading" class="mt-5 mb-5 pt-5 pb-5" />
        <div v-else-if="show" class="gst-just-for-user-entities mx-n4">
            <JustForUserEntitiesSwiperDesktop 
                v-if="areEnoughItemsToShowDesktop" 
                v-show="this.$vuetify.breakpoint.mdAndUp" 
                :items="items" />
            <JustForUserEntitiesSwiperMobile 
                v-show="!this.$vuetify.breakpoint.mdAndUp" 
                :items="items" />
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    import DataLoading from '@core/shared/components/loading/DataLoading';
    import JustForUserEntitiesSwiperDesktop from './JustForUserEntities/JustForUserEntitiesSwiperDesktop';
    import JustForUserEntitiesSwiperMobile from './JustForUserEntities/JustForUserEntitiesSwiperMobile';

    const MIN_ITEMS = 4;

    export default {
        name: 'JustForUserEntities',
        components: {
            DataLoading,
            JustForUserEntitiesSwiperDesktop,
            JustForUserEntitiesSwiperMobile,
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.home.theHome._components.justForUserEntities',
        },
        computed: {
            ...mapState( {
                userFirstAccessApp:     state => state.user.firstAccess,
                items:                  state => state.user.analytics.suggestions,
                loading:                state => state.user.analytics.loading
            } ),
            show( ) {
                return ( this.$vuetify.breakpoint.mdAndUp && this.areEnoughItemsToShowDesktop ) 
                    || ( !this.$vuetify.breakpoint.mdAndUp && this.items.length );
            },
            areEnoughItemsToShowDesktop() {
                return this.items.length >= MIN_ITEMS;
            },
        },
        methods: {
            ...mapActions( {
                getAnalytics: 'user/analytics/get'
            } ),
        },
        mounted( ) {
            this.userFirstAccessApp || this.getAnalytics( );
        }
    };
</script>
<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-just-for-user-entities {
        @include linear-gradient(to top right, theme-color('gradient-secondary-1') 0%, theme-color('gradient-secondary-2') 100%);

        padding-top: 56px;
        padding-bottom: 56px;

        @media (max-width: 959px) {
            padding-top: 16px;
            padding-bottom: 16px;
        }
    }

    .gst-just-for-user-entities__title {
        line-height: font-size( 'xxxxl' );
        color: theme-color( 'white' );
    }

    .gst-just-for-user-entities__navigation {
        .v-btn {
            height: font-size( 'xxxxl' );
            width: font-size( 'xxxxl' );
        }

        svg .gst-svg-icon {
            fill: theme-color( 'white' );
        }
    }

    .gst-just-for-user-entities__slide--destroy {
        animation-name: slide-and-fade;
        animation-duration: 500ms;
        animation-fill-mode: forwards;
    }

    @keyframes slide-and-fade {
        0% {
            opacity: 1;
        }

        100% {
            width: 0;
            opacity: 0;
        }
    }
</style>
