<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="gst-bonus-points-home-banner__content align-start align-md-center flex-grow flex-column flex-md-row pl-md-16 pr-md-12">
            <img :src="$vuetify.breakpoint.mdAndUp ? badgeLarge :badgeSmall" class="gst-bp__badge ml-4 mt-6 ma-md-0" alt="image" />
            <v-flex xs12>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-0 pb-md-0 pt-md-2">
                        {{ $t('title') }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link
                        class="d-flex align-center"
                        :to="{ name: 'help' }">
                        <span>{{ $t('url') }}</span>
                        <v-icon color="white">
                            mdi-chevron-right
                        </v-icon>
                    </router-link>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'BonusPointsCardLarge',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsHomeBanner'
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowEarn': 'isLoyaltyTypeAllowEarn'
            } ),
            badgeSmall( ) {
                return require( '@tenants/jambajuice/assets/earn_more_points_small.png' );
            },
            badgeLarge( ) {
                return require( '@tenants/jambajuice/assets/earn_more_points_large.png' );
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    background: theme-color( 'white' );
    color: theme-color( 'white' );
    overflow: hidden;
    min-height: 120px;

    .gst-bonus-points-home-banner__content {
        border: 2px solid #D5E8AD;
        margin: 8px;
    }

    .gst-bp__cta {
        padding-top: 22px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            outline: none;
            vertical-align: middle;

            i {
                margin-top: 1px;
                color: theme-color( 'primary' ) !important;
            }
        }
    }

    h3 {
        line-height: line-height( 'xxxxxl' );
        color: theme-color( 'quaternary' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
        max-width: 85%;
    }

    .gst-bp__badge {
        position: absolute;
        top: 50%;
        right: 50px;
        height: auto;
        transform: translateY( -50% );
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        padding-left: 8px;

        h3 {
            padding-bottom: 0 !important;
            max-width: 90%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 15px;
        }

        .gst-bp__badge {
            position: relative;
            top: auto;
            left: 0;
            right: auto;
            height: auto;
            transform: none;
        }
    }
}
</style>
