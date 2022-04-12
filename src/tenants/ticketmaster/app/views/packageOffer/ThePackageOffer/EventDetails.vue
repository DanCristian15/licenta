<template>
    <div class="package-offer__event-details-container d-flex align-center">
        <div class="event-details">
            <p class="name">
                {{ event.name }}
            </p>
            <p class="date d-flex align-center">
                <CalendarIcon /> {{ eventDate }}
            </p>
            <p class="location d-flex align-center">
                <LocationIcon /> {{ venueInfoLocation }}
            </p>
            <p class="description">
                {{ $t( 'description' ) }}
            </p>
        </div>
        <div class="event-image d-flex align-center justify-end">
            <img :src="event.imageUrl" alt="Event image" />
        </div>
    </div>
</template>

<script>
    import CalendarIcon from '@tenants/ticketmaster/app/assets/icons/calendar.svg';
    import LocationIcon from '@tenants/ticketmaster/app/assets/icons/location.svg';

    export default {
        name: 'EventDetails',
        components: {
            CalendarIcon,
            LocationIcon
        },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.thePackage._components.eventDetails'
        },
        computed: {
            eventDate( ) {
                const { event } = this;

                return event && event.startDateTime ? this.$options.filters.datePeriod( event.startDateTime, event.endDateTime ) : this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
            venueInfoLocation( ) {
                const { venueName, venueCity, venueState } = this.event;
                const location = this.$options.filters.city( { name: venueCity, stateCode: venueState } );

                return `${venueName}, ${location}`;
            }
        }
    };
</script>

<style lang="scss">
    @import '@scssVariables';
    @import '@scssMixins';

    .package-offer__event-details-container {
        width: 100%;
        border: 1px solid theme-color( 'septenary' );
        border-radius: border-radius( 'xs' );

        .event-details {
            padding: theme-spacing( 7 ) theme-spacing( 8 );
            flex: 1;

            .name {
                line-height: 22px;
                color: #23262D;
                font-size: font-size( 'xxl' );
                font-weight: font-weight( 'large' );
            }

            .date,
            .location {
                line-height: line-height( 's' );
                color: theme-color( 'quaternary' );
                font-size: font-size( 's' );

                svg {
                    margin-right: theme-spacing( 2 );
                }
            }

            .location {
                svg {
                    position: relative;
                    left: 2px;
                    margin-right: theme-spacing( 3 );
                }
            }

            .description {
                line-height: line-height( 'xl' );
                margin-bottom: theme-spacing( 1 );
                color: theme-color( 'tertiary' );
                font-size: font-size( 's' );
            }
        }

        .event-image {
            flex: 1;

            img {
                max-height: 220px;
            }
        }
    }

    @include mobile-only {
        .package-offer__event-details-container {
            max-height: unset;
            flex-direction: column-reverse;

            .event-details {
                padding: theme-spacing( 3 ) theme-spacing( 6 ) theme-spacing( 3 ) theme-spacing( 4 );
            }

            img {
                max-width: 100%;
            }
        }
    }
</style>
