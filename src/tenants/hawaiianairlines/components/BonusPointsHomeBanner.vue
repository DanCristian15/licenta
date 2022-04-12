<template>
    <v-card v-if="isLoyaltyTypeAllowEarn" class="gst-bonus-points-home-banner mx-auto gst-bp py-0 u-box-shadow d-flex">
        <v-layout class="align-center flex-grow flex-row pl-md-8 pr-md-12">
            <v-flex xs12>
                <v-card-text class="gst-bp__headline headline font-weight-bold py-md-0">
                    <h3 class="py-2 pb-md-0 pt-md-2">
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
            <TenantBonusPointsBadge class="gst-bp__badge gst-bp__badge-primary" />
            <TenantBonusPointsBadge class="gst-bp__badge gst-bp__badge-secondary" />
        </v-layout>
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
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";
@import "@scssMixins";

.gst-bonus-points-home-banner {
    padding: 10px 0;
    background-color: theme-color( 'primary' );
    color: theme-color( 'white' );
    overflow: hidden;
    min-height: 120px;

    .gst-bp__cta {
        padding-top: 15px;
        padding-left: 16px;

        a {
            line-height: line-height( 'xxl' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'medium' );
            outline: none;
        }
    }

    h3 {
        line-height: line-height( 'xxxxxl' );
        color: theme-color( 'white' );
        font-weight: font-weight( 'black' ) !important;
        letter-spacing: -0.42px;
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

    .gst-bp__badge-primary,
    .gst-bp__badge-secondary {
        position: absolute;
    }

    .gst-bp__badge-primary {
        right: 200px;
        bottom: -8px;
        height: 81px;
        width: 91px;
        transform: scaleX( -1 );
    }

    .gst-bp__badge-secondary {
        top: 50%;
        right: 19px;
        height: 155px;
        width: 174px;
        transform: translateY( -50% );
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

        .gst-bp__badge-primary {
            display: none;
        }

        .gst-bp__badge-secondary {
            top: auto;
            right: 16px;
            bottom: 16px;
            height: 73px;
            width: 82px;
            transform: none;
        }

        .gst-bp__cta {
            padding-bottom: 28px;
        }
    }
}
</style>
