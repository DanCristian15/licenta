<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow">
        <v-img
            :src="imageSrc"
            class="align-center gst-bp__image"
            :max-height="isMobile ? 250 : 160">
            <v-layout wrap>
                <v-flex shrink class="pt-4 pl-4">
                    <TenantBonusPointsBadge height="40" />
                </v-flex>
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
        name: 'BonusPointsHomeBanner',
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

.gst-bp {
    padding: 10px 0;
    overflow: hidden;

    &.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: border-radius( 'm' ) !important;
    }

    .gst-bp__image {
        .v-image__image {
            background-position: right center !important;
        }
    }

    .gst-bp__coin {
        @include radial-gradient(theme-color('gradient-radial-2'), theme-color('gradient-radial-1'));

        font-size: font-size( 'm' );
        font-weight: font-weight( 'black' );
    }

    .gst-bp__cta {
        padding-left: 16px;

        .gst-icon-svg {
            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }
    }

    h2 {
        color: theme-color( 'quaternary' );
        letter-spacing: -0.43px;
        max-width: 85%;

        @include mobile-only {
            font-size: font-size( 'xxxxl' );
        }
    }

    a {
        line-height: 24px;
        color: theme-color( 'primary' );
        vertical-align: middle;
    }

    .gst-bp__circle-l,
    .gst-bp__circle-r {
        position: absolute;
    }

    .gst-bp__circle-l {
        top: -20px;
        left: -25px;
        opacity: 0.2;
    }

    .gst-bp__circle-r {
        right: -50px;
        bottom: -100px;
    }

    @include mobile-only {
        .gst-bp__headline {
            padding-top: 0;
        }
    }
}
</style>
