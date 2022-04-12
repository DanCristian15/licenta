
<template>
    <v-flex
        :class="offerClass"
        d-flex
        align-center
        class="gst-ticket-offer-type-icon">
        <div class="d-inline-block gst-ticket-offer-type-icon__icon">
            <component :is="offerIcon" />
        </div>
        <VClamp
            v-if="lines"
            autoresize
            :max-lines="lines"
            class="d-inline">
            {{ offerLabel }}
        </VClamp>
        <span v-else>
            {{ offerLabel }}
        </span>
    </v-flex>
</template>
<script>
    import VClamp from 'vue-clamp';
    import { isResale as ticketUtilsIsResale } from '@core/utils/ticketUtils';
    import IconCheckCircle from '@core/shared/assets/icons/check_circle.svg';
    import IconTicket from '@core/shared/assets/icons/ticket.svg';

    export default {
        name: 'TicketTypeIconVariantOne',
        components: {
            /* eslint-disable vue/no-unused-components */
            IconCheckCircle,
            IconTicket,
            VClamp
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
            },
            lines: {
                type: Number,
                default: 2
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
            .gst-svg-icon {
                fill: theme-color( 'success' );
            }
        }

        color: theme-color( 'success' );
    }

    .gst-ticket-offer-type-icon.gst-ticket-offer-type-icon--standard {
        svg {
            .gst-svg-icon {
                fill: theme-color( 'primary' );
            }
        }

        color: theme-color( 'primary' );
    }
</style>
