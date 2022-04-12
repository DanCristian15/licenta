<template>
    <v-toolbar
        class="gst-event-info-modal__subheader flex-grow-0"
        height="auto"
        flat>
        <v-flex
            d-flex
            flex-column
            class="gst-event-info-modal__subheader-content py-3">
            <h6 v-if="!$vuetify.breakpoint.mdAndUp" class="text-uppercase mb-3">
                {{ $t( 'title' ) }}
            </h6>
            <VClamp
                autoresize
                :max-lines="1"
                class="hyphens clamp gst-event-info-modal__subheader-content__name mb-3">
                {{ event.name }}
            </VClamp>
            <v-flex
                align-stretch
                class="gst-event-info-modal__subheader-content__info d-flex flex-column align-start">
                <v-flex d-flex class="align-center mb-2">
                    <IconDate class="mr-2 flex-shrink-0" /> {{ eventDate }}
                </v-flex>
                <v-flex d-flex>
                    <IconLocation class="mr-2 flex-shrink-0" />
                    <VenueInfo
                        :clampable="false"
                        class="hyphens clamp"
                        :item="venueInfoLocation" />
                </v-flex>
                <v-flex d-flex class="pl-8">
                    <LocationDirectionsButton
                        class="mt-1"
                        :small="!$vuetify.breakpoint.mdAndUp"
                        :location="venueInfoLocation" />
                </v-flex>
            </v-flex>
        </v-flex>
    </v-toolbar>
</template>

<script>
    import VClamp from 'vue-clamp';
    import LocationDirectionsButton from '@core/shared/components/buttons/LocationDirectionsButton';
    import VenueInfo from '@core/shared/components/containerInfo/VenueInfo';
    import IconLocation from '@core/shared/assets/icons/location.svg';
    import IconDate from '@core/shared/assets/icons/date.svg';

    export default {
        name: 'EventInfoModalSubHeader',
        components: {
            VenueInfo,
            VClamp,
            IconDate,
            IconLocation,
            LocationDirectionsButton,
        },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        i18nOptions: {
            namespaces: 'main',
            keyPrefix: 'views.event.eventInfoModal'
        },
        computed: {
            eventDate( ) {
                const event = this.event;

                return event && event.startDateTime ? this.$options.filters.datePeriod( event.startDateTime, event.endDateTime, { hasStartTime: event.hasStartTime } ) : this.$t( '_common:terms.dateAndTimeToBeDetermined' );
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
            padding-bottom: 0;
        }

        .gst-event-info-modal__subheader-content {
            h6 {
                @include mobile-only {
                    line-height: line-height( 'xs' );
                    color: theme-color( 'tertiary' );
                    font-size: font-size( 'xxxs' );
                }
            }

            .gst-event-info-modal__subheader-content__name {
                line-height: 26px;
                color: theme-color( 'quaternary' );
                font-size: 22px;
                font-weight: font-weight( 'medium' );

                @include mobile-only {
                    line-height: line-height( 'xxxxl' );
                    font-size: font-size( 'xxxl' );
                }
            }

            .gst-event-info-modal__subheader-content__info {
                line-height: line-height( 'xxl' );
                color: theme-color( 'tertiary' );
                font-size: font-size( 'l' );

                svg {
                    margin-top: -3px;

                    .gst-svg-icon {
                        fill: theme-color( 'tertiary' );
                    }
                }
            }
        }
    }

    @include mobile-only {
        .gst-event-info-modal__subheader {
            .gst-event-info-modal__subheader-content {
                .gst-event-info-modal__subheader-content__info {
                    font-size: font-size( 's' );
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
            border-radius: border-radius( 'none' ) !important;
            border-left: none !important;
        }
    }
</style>