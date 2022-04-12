<template>
    <CardIconContainer
        :outlined="outlined"
        class="gst-ticket-offer-price-icon"
        flat>
        <h5 class="gst-ticket-offer-price-icon__price">
            <template v-if="priceNumber">
                <span v-if="isStartingPrice">{{ $t('_common:terms.from') }} </span>{{ price | currencyFull( currency) }} <span>{{ $t( 'labels.priceSuffix' ) }}</span>
            </template>
            <template v-else>
                {{ $t('labels.titleNoPrice') }}
            </template>
        </h5>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <TenantBonusPointsChip
            :points="points"
            :currency="currency"
            :is-loyalty-currency-type-money="isLoyaltyCurrencyTypeMoney"
            :content="contentChip"
            class="u-width-100 gst-ticket-offer-price-icon__bonus-points-chip"
            tag="div" />
    </CardIconContainer>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { getSymbol } from '@core/utils/currencyUtils';
    import CardIconContainer from '@core/shared/components/misc/CardIconContainer.vue';

    export default {
        name: 'PriceIcon',
        components: {
            CardIconContainer,
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.misc.priceIcon'
        },
        props: {
            price: {
                type: [ Number, String ],
                default: 0
            },
            currency: {
                type: String,
                default: ''
            },
            points: {
                type: [ Number, String ],
                default: 0
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
            },
            outlined: {
                type: Boolean,
                default: true
            },
            isStartingPrice: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'earnRate': 'earnRate'
            } ),
            pointsFormated( ) {
                if ( this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$options.filters.currencyFull( this.points, this.currency );
                }

                return this.$options.filters.bonusPoints( this.points );
            },
            priceNumber( ) {
                return this.points * 1;
            },
            pointsNumber( ) {
                return this.points * 1;
            },
            contentChip( ) {
                const contentBonusPoints = this.$t(
                    this.isLoyaltyCurrencyTypeMoney ? 'labels.money' : 'labels.points',
                    {
                        points: `${this.earnRate}%`,
                        currencySymbol: this.currencySymbol,
                        currency: this.loyaltyCurrency || this.currency
                    }
                );
                if ( !this.pointsNumber ) {
                    if ( this.isLoyaltyCurrencyTypeMoney ) {
                        return '';
                    }

                    const titleChip0 = this.$t( 'labels.titleChip_0' );

                    return `
                        <p class="gst-ticket-offer-price-icon__bonus-points">
                            ${titleChip0}
                        </p>`;
                }

                return `
                    <p class="gst-ticket-offer-price-icon__bonus-points">
                        ${contentBonusPoints}
                    </p>`;
            },
            currencySymbol( ) {
                return getSymbol( this.currency );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-card-icon-container.gst-ticket-offer-price-icon {
        width: 150px;

        .gst-ticket-offer-price-icon__price {
            @include font-size('s');
            @include font-weight('bold');

            line-height: 18px;
            padding: 10px 5px 7px;

            span {
                @include font-size('xxs');
                @include font-weight('regular');
            }
        }

        .gst-ticket-offer-price-icon__bonus-points-chip {
            @include font-size('xxxxs');
            @include font-weight('bold');
            @include line-height('xxxs');

            height: auto;
            width: 100%;
            padding: 5px 3px 4px;
            border-radius: 0;
            white-space: unset;
            justify-content: center;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";

    .gst-card-icon-container.gst-ticket-offer-price-icon {
        .gst-ticket-offer-price-icon__bonus-points-chip {
            p {
                margin-bottom: 0;
            }

            .gst-ticket-offer-price-icon__money {
                text-transform: initial;

                @media (min-width: 960px) {
                    @include font-weight('regular');
                }
            }
        }
    }
</style>
