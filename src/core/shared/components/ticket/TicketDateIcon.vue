
<template>
    <v-flex
        d-flex
        align-center
        class="gst-ticket-date-icon">
        <IconDate class="mr-2" />
        {{ date }}
    </v-flex>
</template>
<script>
    import IconDate from '@core/shared/assets/icons/date.svg';

    export default {
        name: 'TicketDateIcon',
        components: {
            IconDate
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.ticket.ticketOfferTypeIcon'
        },
        props: {
            startDateTime: {
                type: Date,
                required: true
            },
            endDateTime: {
                type: Date,
                default: null
            },
            hasStartTime: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            date( ) {
                return this.$options.filters.datePeriod( this.startDateTime, this.endDateTime, { hasStartTime: this.hasStartTime } );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-ticket-date-icon {
        font-weight: font-weight( 'medium' );

        svg {
            opacity: 0.6;

            .gst-svg-icon {
                fill: theme-color( 'tertiary' );
            }
        }

        fill: theme-color( 'tertiary' );
    }

</style>
