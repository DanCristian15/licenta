
<template>
    <v-flex
        :class="offerClass"
        d-flex
        align-center
        class="gst-ticket-offer-type-icon">
        <v-flex d-flex shrink>
            <component :is="offerIcon" />
        </v-flex>
        {{ offerLabel }}
    </v-flex>
</template>
<script>
    import { isResale as ticketUtilsIsResale } from '@core/utils/ticketUtils';
    import IconCheckCircle from '@core/shared/assets/icons/check_circle.svg';
    import IconTicket from '@core/shared/assets/icons/ticket.svg';

    export default {
        name: 'TicketTypeIconVariantOne',
        components: {
            /* eslint-disable vue/no-unused-components */
            IconCheckCircle, 
            IconTicket
            /* eslint-enable vue/no-unused-components */
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.ticket.ticketOfferTypeIcon'
        },
        props: {
            type: {
                type: String,
                default: 'standard'
            },
            offerName: {
                type: String,
                default: 'standard'
            }
        },
        computed: {
            offerIcon( ) {
                return ticketUtilsIsResale( this.type ) ? 'IconCheckCircle' : 'IconTicket';
            },
            offerLabel( ) {
                return this.offerName;
            },
            offerClass( ) {
                return ticketUtilsIsResale( this.type ) ? 'gst-ticket-offer-type-icon--resale' : 'gst-ticket-offer-type-icon--standard';
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-ticket-offer-type-icon {
        line-height: 13px;
        font-size: font-size( 'xxxs' );
        font-weight: font-weight( 'bold' );
        text-transform: uppercase;
    }

    .gst-ticket-offer-type-icon.gst-ticket-offer-type-icon--resale {
        svg {
            height: 24px;
            width: 24px;

            .gst-svg-icon {
                fill: theme-color( 'success' );
            }
        }

        color: theme-color( 'success' );
    }

    .gst-ticket-offer-type-icon.gst-ticket-offer-type-icon--standard {
        svg {
            height: 24px;
            width: 24px;

            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }

        color: theme-color( 'primary' );
    }
</style>
