<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="flex-grow flex-wrap flex-md-no-wrap">
            <v-flex xs12 md9 class="d-flex justify-center flex-column pl-md-15 order-2 order-md-1">
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
                        <v-icon color="primary">
                            mdi-chevron-right
                        </v-icon>
                    </router-link>
                </v-card-actions>
            </v-flex>
            <v-flex xs12 md3 class="white d-flex align-start align-md-center justify-start justify-md-center order-1 order-md-2 pt-6 pl-6 pb-3 pa-md-0">
                <TenantBonusPointsBadge class="gst-bp__badge" />
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
            } )
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    background-color: #F9F9F9;
    color: theme-color( 'quaternary' );
    overflow: hidden;
    min-height: 120px;

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
            outline: none;
            vertical-align: middle;

            i {
                margin-top: 1px;
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
        background: theme-color( 'white' );
        max-width: 175px;
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        h3 {
            padding-bottom: 0 !important;
            max-width: 90%;
        }

        .gst-bp__cta {
            padding-top: 0;
            padding-bottom: 27px;
        }

        .gst-bp__badge {
            max-width: 105px;
        }
    }
}
</style>
