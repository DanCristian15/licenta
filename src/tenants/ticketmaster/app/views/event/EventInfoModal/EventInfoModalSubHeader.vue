<template>
    <v-toolbar
        class="gst-event-info-modal__subheader flex-grow-0 px-4 px-md-6"
        height="auto"
        flat>
        <v-flex
            d-flex
            flex-column
            class="gst-event-info-modal__subheader-content py-4">
            <VClamp
                autoresize
                :max-lines="1"
                class="hyphens clamp gst-event-info-modal__subheader-content__name mb-6">
                {{ event.name }}
            </VClamp>
            <v-divider />
            <table class="gst-event-info-modal__subheader-content__table">
                <tbody>
                    <tr class="pt-4">
                        <td class="gst-event-info-modal__subheader-content__column-one pt-4">
                            <IconClock class="mr-2 flex-shrink-0" />Date
                        </td>
                        <td class="gst-event-info-modal__subheader-content__column-one-two pt-4">
                            <div>
                                {{ eventDate }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="gst-event-info-modal__subheader-content__column-one pt-4">
                            <IconLocation class="mr-2 flex-shrink-0" />Venue
                        </td>
                        <td class="gst-event-info-modal__subheader-content__column-two pt-4">
                            <div>
                                <VenueInfo
                                    :clampable="false"
                                    class="hyphens clamp"
                                    :item="venueInfoLocation" />
                                <LocationDirectionsButton
                                    class="mt-1"
                                    :small="!$vuetify.breakpoint.mdAndUp"
                                    :location="venueInfoLocation" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <v-divider v-if="!event.healthCheck" />
        </v-flex>
    </v-toolbar>
</template>

<script>
    import VClamp from 'vue-clamp';
    import LocationDirectionsButton from '@core/shared/components/buttons/LocationDirectionsButton';
    import IconLocation from '@tenant/app/assets/icons/location-outlined.svg';
    import IconClock from '@tenant/app/assets/icons/clock-outlined.svg';
    import VenueInfo from '../../../components/containerInfo/VenueInfo';

    export default {
        name: 'EventInfoModalSubHeader',
        components: {
            VenueInfo,
            VClamp,
            IconClock,
            IconLocation,
            LocationDirectionsButton,
        },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        computed: {
            eventDate( ) {
                const event = this.event;

                return event && event.startDateTime ? this.$options.filters.datePeriod( event.startDateTime, event.endDateTime ) : this.$t( '_common:terms.dateAndTimeToBeDetermined' );
            },
            venueInfoLocation( ) {
                const { venueName, venueStreet, venueCity, venueState, venueCountry } = this.event;

                return {
                    name:          venueName,
                    street:        venueStreet,
                    city:          venueCity,
                    stateCode:     venueState,
                    countryCode:   venueCountry
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-info-modal__subheader {
        ::v-deep .v-toolbar__content {
            padding: 0;
        }

        .gst-event-info-modal__subheader-content {
            h6 {
                @include mobile-only {
                    @include font-size('xxxs');

                    color: theme-color( 'tertiary' );

                    @include line-height('xs');
                }
            }

            .gst-event-info-modal__subheader-content__name {
                line-height: 30px;
                color: theme-color( 'quaternary' );
                font-size: 24px;
                font-weight: 600;

                @include mobile-only {
                    @include font-size('xxxl');
                    @include line-height('xxxxl');
                }
            }

            .gst-event-info-modal__subheader-content__info {
                @include font-size('l');

                color: theme-color( 'tertiary' );

                @include line-height('xxl');

                svg {
                    margin-top: -3px;

                    .gst-svg-icon {
                        fill: theme-color( 'tertiary' );
                    }
                }
            }

            .gst-event-info-modal__subheader-content__table {
                .gst-event-info-modal__subheader-content__column-one {
                    width: 100px;
                    line-height: 20px;
                    font-size: font-size( 'l' );
                    font-weight: 600;
                    vertical-align: top;

                    svg {
                        vertical-align: middle;
                    }
                }
            }
        }

        ::v-deep .gst-location-directions-btn {
            font-size: font-size( 's' );
        }
    }

    @include mobile-only {
        .gst-event-info-modal__subheader {
            .gst-event-info-modal__subheader-content {
                .gst-event-info-modal__subheader-content__info {
                    @include font-size('s');

                    .gst-event-info-modal__subheader-content__column-one {
                        @include font-size('l');
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    @import "@scssVariables";
    @import "@scssMixins";

    .gst-event-info-modal__subheader {
        .gst-event-info-modal__subheader-health-check-warning-card {
            background-color: rgba( theme-color-hex( 'event-health-check' ), 0.1 );
            box-shadow: none !important;
            border-radius: 0 !important;
            border-left: none !important;
        }
    }
</style>
