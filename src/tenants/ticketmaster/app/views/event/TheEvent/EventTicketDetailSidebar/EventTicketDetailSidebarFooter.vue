<template>
    <div class="gst-event-ticket-detail-sidebar-footer d-flex flex-row px-4 py-2">
        <div class="flex-grow-1">
            <div class="gst-event-ticket-detail-sidebar-footer__quantity">
                {{ totalQuantity }}
            </div>
            <div class="d-flex flex-row align-center">
                <span class="gst-event-ticket-detail-sidebar-footer__price">
                    {{ totalBasePrice | currencyFull( currency ) }}
                </span>
                <span v-if="totalBasePrice" class="gst-event-ticket-detail-sidebar-footer__price-info ml-1">
                    {{ $t( '_common:terms.plusTaxesAndFees' ) }}
                </span>
            </div>
        </div>
        <BaseButton
            color="success"
            :disabled="!enableSubmit"
            class="gst-event-ticket-detail-sidebar-footer__submit-btn"
            depressed
            @click="$emit('submit')">
            {{ $t( '_common:buttons.next' ) }}
        </BaseButton>
    </div>
</template>

<script>
    import BaseButton from '@shared/components/buttons/BaseButton.vue';

    export default {
        name:  'EventTicketDetailSidebarFooter',
        components: {
            BaseButton
        },
        props: {
            quantityTickets: {
                type: Number,
                default: 0
            },
            quantityHotelNights: {
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
                const { quantityTickets, quantityHotelNights } = this;

                let ret = this.$t( '_common:terms.ticketWithCount', { count: quantityTickets } );

                if ( !quantityHotelNights ) {
                    return ret;
                } else {
                    return `${ret} + ${ this.$t( '_common:terms.nightStayWithCount', { count:quantityHotelNights } ) }`;
                }
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .gst-event-ticket-detail-sidebar-footer {
        background: theme-color( 'quinary' );
        border-top: 1px solid theme-color-hex( 'senary-darken-2' );

        .gst-event-ticket-detail-sidebar-footer__quantity {
            @include font-size('s');
            @include font-weight('regular');
            @include line-height('xl');

            color: theme-color( 'quaternary' );
        }

        .gst-event-ticket-detail-sidebar-footer__price {
            @include font-size('l');
            @include font-weight('bold');
            @include line-height('xxxl');

            color: theme-color( 'primary' );
        }

        .gst-event-ticket-detail-sidebar-footer__price-info {
            @include font-size('xxs');
            @include font-weight('regular');

            color: theme-color( 'primary' );
        }

        .gst-event-ticket-detail-sidebar-footer__submit-btn {
            @include font-size('xxl');
            @include font-weight('large');

            text-transform: capitalize;
        }
    }

    @include mobile-only {
        .gst-event-ticket-detail-sidebar-footer {
            .gst-event-ticket-detail-sidebar-footer__price {
                @include font-weight('large');
            }

            .gst-event-ticket-detail-sidebar-footer__submit-btn {
                @include font-size('l');
            }
        }
    }
</style>