<template>
    <component
        :is="tag"
        v-if="isLoyaltyTypeAllowEarn"
        class="gst-bp-chip">
        <!-- eslint-disable-next-line vue/no-v-html  -->
        <p v-html="contentHTML"></p>
    </component>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { getSymbol as currencyUtilsGetSymbol } from '@core/utils/currencyUtils';

    export default {
        name: 'BonusPointsChip',
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.bonusPoints.bonusPointsChip',
        },
        props: {
            points: {
                type: Number,
                required: true,
                default: 0
            },
            currency: {
                type: String,
                required: true,
                default: ''
            },
            isLoyaltyCurrencyTypeMoney: {
                type: Boolean,
                default: false
            },
            content: {
                type: String,
                default: ''
            },
            tag: {
                type: String,
                default: 'div'
            }
        },
        computed: {
            ...mapGetters ( 'appTenant', {
                'isLoyaltyTypeAllowEarn': 'isLoyaltyTypeAllowEarn'
            } ),
            contentHTML( ) {
                const { content } = this;
                if ( content ) {
                    return content;
                }

                return this.$t( 
                    this.isLoyaltyCurrencyTypeMoney ? 'titleMoney' : 'title', 
                    { 
                        count: this.points, 
                        points: this.pointsFormated, 
                        currencySymbol: currencyUtilsGetSymbol( this.currency ),
                        interpolation: { escapeValue: false },
                        context: `${this.points}`
                    } 
                );
            },
            pointsFormated( ) {
                if ( this.isLoyaltyCurrencyTypeMoney ) {
                    return this.$options.filters.currencyFull( this.points, this.currency );
                }

                return this.$options.filters.bonusPoints( this.points );
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "@scssVariables";

.gst-bp-chip {
    display: inline-flex;
    padding-top: 2px;
    padding-bottom: 2px;
    background: theme-color( 'bonus-points-chip-bg-color' );
    color: theme-color( 'bonus-points-chip-color' );
    font-size: font-size( 'xxxs' );
    font-weight: font-weight( 'black' );
    min-height: 20px;
    border-radius: 16px;
    text-align: center;
    text-transform: uppercase;

    p {
        line-height: 12px;
        padding: 0 12px;
        margin-top: auto;
        margin-bottom: auto;
        vertical-align: bottom;
    }
}
</style>
