<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow">
        <v-img
            :src="imageSrc"
            contain
            :position="isMobile ? 'bottom right' : 'center center'"
            class="align-center gst-bp__image"
            :max-height="isMobile ? 200 : 160">
            <v-layout wrap>
                <v-flex xs12 sm10>
                    <v-card-text class="gst-bp__headline headline font-weight-bold">
                        <h3 class="font-weight-black py-2">
                            {{ title }}
                        </h3>
                    </v-card-text>
                    <v-card-actions class="gst-bp__cta">
                        <router-link
                            :to="{ name: 'help' }"
                            class="font-weight-medium">
                            {{ $t('url') }}
                            <i class="gst-icon-svg u-rotate-90-n">
                                <IconDropDownArrow />
                            </i>
                        </router-link>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-img>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            IconDropDownArrow
        },
        props: {
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
            }
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsHomeBanner'
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowEarn': 'isLoyaltyTypeAllowEarn',
                'earnRate': 'earnRate'
            } ),
            isMobile() {
                return this.$vuetify.breakpoint.xsOnly;
            },
            imageSrc() {
                const device = this.isMobile ? 'MOBILE' : 'DESKTOP';
                return   imageConstants.BONUS_POINTS[device].HOME;
            },
            title() {
                if ( !this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$t( 'title' );
                } else {
                    const earnRatePercent = this.earnRate ? `${this.earnRate}%` : '';
                    return this.$t( 'titleMoney', { earnRatePercent: earnRatePercent } );
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    background: theme-color( 'secondary' ) !important;
    overflow: hidden;

    .gst-bp__image {
        .v-image__image {
            background-position: right center !important;
        }
    }

    .gst-bp__cta {
        padding-left: 16px;
    }

    h3 {
        color: theme-color( 'white' );
        font-weight: font-weight( 'medium' );
        letter-spacing: -0.43px;
        max-width: 85%;
    }

    a {
        line-height: line-height( 'xxxxl' );
        color: theme-color( 'white' ) !important;
        vertical-align: middle;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'white' ) !important;
            }
        }
    }
}

.gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        .gst-bp__headline {
            padding-top: 0;
        }

        h3 {
            font-size: font-size( 'xxxxl' );
        }
    }
}
</style>
