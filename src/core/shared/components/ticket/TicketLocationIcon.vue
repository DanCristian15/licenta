
<template>
    <v-flex
        d-flex
        align-center
        class="gst-ticket-location-icon">
        <IconLocation class="mr-2 flex-shrink-0" />
        <VenueInfo :item="venue" :clampable="false" />
    </v-flex>
</template>
<script>
    import IconLocation from '@core/shared/assets/icons/location.svg';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo.vue';

    export default {
        name: 'TicketLocationIcon',
        components: {
            IconLocation,
            VenueInfo
        },
        i18nOptions: {
            namespaces: 'shared',
            keyPrefix: 'components.ticket.ticketOfferTypeIcon'
        },
        props: {
            venue: {
                type: Object,
                default: () => ( { name: '', city: '', street: '', stateCode: '', countryCode: '' } )
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@scssVariables";

    .gst-ticket-location-icon {
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
