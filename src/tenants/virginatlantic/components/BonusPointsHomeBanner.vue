<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow">
        <v-layout flex class="gst-bonus-points-home-banner__content">
            <v-flex grow>
                <v-card-text class="gst-bp__headline headline font-weight-bold">
                    <h3 class="py-2">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <v-layout flex>
                        <v-flex d-flex align-lg-enter align-end>
                            <router-link
                                :to="{ name: 'help' }"
                                color="white"
                                class="mb-2">
                                {{ $t('url') }}
                                <i class="gst-icon-svg u-rotate-90-n">
                                    <IconDropDownArrow />
                                </i>
                            </router-link>
                        </v-flex>
                        <v-flex v-if="!$vuetify.breakpoint.mdAndUp" shrink d-flex justify-center align-center>
                            <CirclesLargeIcon height="58" width="120" />
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-flex>
            <v-flex v-if="$vuetify.breakpoint.mdAndUp" shrink d-flex justify-center align-center>
                <CirclesLargeIcon height="85" width="220" />
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imageConstants from '@core/utils/constants/imagePaths';
    import IconDropDownArrow from '@core/shared/assets/icons/dropdown_arrow.svg';
    import CirclesLargeIcon from '../assets/banners_assets/circles_large_home.svg';

    export default {
        name: 'BonusPointsCardLarge',
        components: {
            CirclesLargeIcon,
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

.gst-bp {
    padding: 10px 0;
    background-color: #61126B !important;
    overflow: hidden;

    h3 {
        color: theme-color( 'white' );
        font-weight: font-weight( 'medium' ) !important;
        letter-spacing: -0.43px;
        max-width: 85%;
    }

    .gst-bp__cta {
        padding-left: 16px;

        a {
            line-height: line-height( 'xxxxl' );
            color: theme-color( 'white' );
            font-weight: font-weight( 'regular' ) !important;
            vertical-align: middle;
        }

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'white' ) !important;
            }
        }
    }
}

.gst-bp.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' );
}

@include mobile-only {
    .gst-bp {
        .gst-bp__headline {
            padding-top: 0;
        }

        h3 {
            font-size: font-size( 'xxxxl' );
            font-weight: font-weight( 'bold' ) !important;
        }
    }
}

@media (max-width: 959px) {
    .gst-bp {
        .gst-bonus-points-home-banner__content {
            padding-top: 33px;
            padding-bottom: 16px;
        }
    }
}

@media (min-width: 960px) {
    .gst-bp {
        .gst-bonus-points-home-banner__content {
            padding-left: 84px;
        }
    }
}
</style>
