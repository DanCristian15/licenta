<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow">
        <v-img
            :src="imageSrc"
            class="align-center gst-bonus-points-home-banner__image"
            :max-height="isMobile ? 250 : 160">
            <v-layout wrap>
                <v-flex xs12 sm10 class="gst-bonus-points-home-banner__content">
                    <v-card-text class="gst-bonus-points-home-banner__headline headline font-weight-bold">
                        <h3 class="font-weight-black py-2">
                            {{ title }}
                        </h3>
                    </v-card-text>
                    <v-card-actions class="gst-bonus-points-home-banner__cta ml-2">
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
        overflow: hidden;

        .gst-bonus-points-home-banner__image {
            .v-image__image {
                background-position: right center !important;
            }
        }

        .gst-bonus-points-home-banner__content {
            padding-left: 100px;

            h3 {
                color: theme-color( 'white' );
                letter-spacing: -0.43px;
            }

            a {
                line-height: line-height( 'xxxxl' );
                color: theme-color( 'primary' );
                vertical-align: middle;

                .gst-icon-svg {
                    .gst-svg-icon {
                        fill: theme-color( 'primary' ) !important;
                    }
                }
            }
        }

        .gst-bonus-points-home-banner__cta {
            margin-top: -10px;
        }
    }

    .gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    @include mobile-only {
        .gst-bonus-points-home-banner {
            .gst-bonus-points-home-banner__content {
                padding-left: 0;

                h3 {
                    font-size: font-size( 'xxxxl' );
                }
            }
        }
    }

    @include mobile-xs-only {
        .gst-bonus-points-home-banner {
            .gst-bonus-points-home-banner__cta {
                position: absolute;
                margin-top: 10px;
            }
        }
    }
</style>
