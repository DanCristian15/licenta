<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-stretch flex-column flex-md-row u-width-100">
            <v-flex grow class="gst-bonus-points-home-banner__content">
                <div v-if="!$vuetify.breakpoint.mdAndUp"
                    class="gsp-bp__badge-container d-flex align-center">
                </div>
                <v-card-text class="gst-bp__headline headline font-weight-bold">
                    <h3 class="">
                        {{ title }}
                    </h3>
                </v-card-text>
                <v-card-actions class="gst-bp__cta">
                    <router-link
                        class="d-flex align-center"
                        :to="{ name: 'help' }">
                        <span>{{ $t('url') }}</span>
                        <i class="gst-icon-svg u-rotate-90-n">
                            <IconDropDownArrow />
                        </i>
                    </router-link>
                </v-card-actions>
            </v-flex>
        </v-layout>
        <v-img class="gst-bp__landing"
            :src="imageSrc"
            flat
            contain />
        <TenantBonusPointsBadge
            v-if="!$vuetify.breakpoint.mdAndUp"
            class="gst-bp__bonus-badge rounded-0"
            contain />
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
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
            title() {
                if ( !this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$t( 'title' );
                } else {
                    const earnRatePercent = this.earnRate ? `${this.earnRate}%` : '';
                    return this.$t( 'titleMoney', { earnRatePercent: earnRatePercent } );
                }
            },
            imageSrc() {
                return require( '../assets/banner_top_right.png' ) ;
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    padding-right: 29px;
    background:
        linear-gradient( white, white ) padding-box,
        linear-gradient( to right, #FF972A, #6911F9 ) border-box !important;
    color: theme-color( 'quaternary' );
    border-radius: border-radius( 'm' );
    border-bottom: 4px solid transparent;
    overflow: hidden;

    .gst-bonus-points-home-banner__content {
        margin-top: 30px;
        margin-left: 77px;

        .gst-bp__headline {
            padding: 0;

            h3 {
                line-height: line-height( 'xxxxxxl' );
                padding-top: 0;
                color: theme-color( 'quaternary' );
                font-weight: font-weight( 'bold' ) !important;
                letter-spacing: -0.42px;
            }
        }

        .gst-bp__cta {
            line-height: line-height( 'xxl' );
            padding-top: 15px;
            padding-bottom: 15px;
            padding-left: 0;
            color: theme-color( 'primary' ) !important;
            font-size: font-size( 's' );
            font-weight: font-weight( 'large' );
            outline: none;
            vertical-align: middle;

            .gst-icon-svg {
                .gst-svg-icon {
                    fill: theme-color( 'primary' ) !important;
                }
            }
        }
    }
}

.gst-bonus-points-home-banner.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: border-radius( 'm' ) !important;
}

@include mobile-only {
    .gst-bonus-points-home-banner {
        display: flex;
        padding-right: 0;
        border: none;

        .gst-bonus-points-home-banner__content {
            margin-top: 33px;
            margin-left: 24px;

            .gst-bp__headline {
                padding: 0;
                padding-top: 20px;

                h3 {
                    line-height: line-height( 'xxxxxxl' );
                    padding-top: 0;
                    color: theme-color( 'quaternary' );
                    font-weight: font-weight( 'bold' ) !important;
                    letter-spacing: -0.42px;
                }
            }

            .gst-bp__cta {
                line-height: line-height( 'xxl' );
                padding-top: 8px;
                padding-bottom: 24px;
                padding-left: 0;
                color: theme-color( 'primary' ) !important;
                font-size: font-size( 's' );
                font-weight: font-weight( 'large' );
                outline: none;
                vertical-align: middle;
            }
        }

        .gsp-bp__badge-container {
            width: 77px;
            margin-top: 0;
            margin-bottom: 20px;

            .gst-bp__badge {
                height: 31px;
                width: 31px;
            }
        }

        .gst-bp__landing {
            position: absolute;
            height: 40px;
            width: 109px;
            margin-top: 17px;
            margin-left: 20px;
        }

        .gst-bp__bonus-badge {
            position: absolute;
            right: 16px;
            bottom: 16px;
            height: auto !important;
            width: 44px !important;
        }
    }
}
</style>
