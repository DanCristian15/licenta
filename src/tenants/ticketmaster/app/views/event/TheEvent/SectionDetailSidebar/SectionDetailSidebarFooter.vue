<template>
    <div class="gst-section-detail-sidebar-footer d-flex px-4 py-2">
        <div class="flex-grow-1">
            <template v-if="quantityRooms">
                <div class="gst-section-detail-sidebar-footer__quantity">
                    {{ totalQuantity }}
                </div>
                <div class="d-flex flex-row align-center">
                    <span class="gst-section-detail-sidebar-footer__price">
                        {{ totalBasePrice | currencyFull( currency ) }}
                    </span>
                    <span v-if="totalBasePrice" class="gst-section-detail-sidebar-footer__price-info ml-1">
                        {{ $t( '_common:terms.plusTaxesAndFees' ) }}
                    </span>
                </div>
            </template>
        </div>
        <BaseButton
            color="success"
            :disabled="!enableSubmit"
            class="gst-section-detail-sidebar-footer__submit-btn gst-btn"
            depressed
            @click="$emit('submit')">
            {{ $t( '_common:buttons.next' ) }}
        </BaseButton>
    </div>
</template>

<script>
    import BaseButton from '@shared/components/buttons/BaseButton.vue';

    export default {
        name:  'SectionDetailSidebarFooter',
        components: {
            BaseButton
        },
        props: {
            quantityTickets: {
                type: Number,
                default: 0
            },
            quantityRooms: {
                type: Number,
                default: 0
            },
            totalBasePrice: {
                type: Number,
                default: 0
            },
            currency: {
                type: String,
                default: 'USD'
            },
            enableSubmit: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            totalQuantity( ) {
                const { quantityTickets, quantityRooms } = this;

                return `
                    ${this.$t( '_common:terms.ticketWithCount', { count: quantityTickets } )},
                    ${this.$t( '_common:terms.roomWithCount', { count: quantityRooms } )}
                `;
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-section-detail-sidebar-footer {
        background: theme-color( 'quinary' );
        border-top: 1px solid theme-color-hex( 'senary-darken-2' );

        .gst-section-detail-sidebar-footer__quantity {
            line-height: line-height( 'xl' );
            color: theme-color( 'quaternary' );
            font-size: font-size( 's' );
            font-weight: font-weight( 'regular' );
        }

        .gst-section-detail-sidebar-footer__price {
            line-height: line-height( 'xxxl' );
            color: theme-color( 'primary' );
            font-size: font-size( 'l' );
            font-weight: font-weight( 'bold' );
        }

        .gst-section-detail-sidebar-footer__price-info {
            color: theme-color( 'primary' );
            font-size: font-size( 'xxs' );
            font-weight: font-weight( 'regular' );
        }

        .gst-section-detail-sidebar-footer__submit-btn {
            font-size: font-size( 'xxl' );
            font-weight: font-weight( 'large' );
            letter-spacing: 0;
            text-transform: capitalize;
        }
    }

    @include mobile-only {
        .gst-section-detail-sidebar-footer {
            .gst-section-detail-sidebar-footer__price {
                font-weight: font-weight( 'large' );
            }

            .gst-section-detail-sidebar-footer__submit-btn {
                font-size: font-size( 'l' );
            }
        }
    }
</style>
